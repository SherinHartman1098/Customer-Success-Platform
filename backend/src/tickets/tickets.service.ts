import { PrismaClient, TicketPriority, TicketStatus } from "@prisma/client";
import { Ticket } from "@prisma/client";

const prisma = new PrismaClient();

interface TicketData {
  customerId: number;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
}
//Create a new ticket
export const createTicket = async (data: TicketData) => {
  const { customerId, title, description, priority, status } = data;

  // Basic validation
  if (!customerId || !title || !description || !priority || !status) {
    throw new Error(
      "Customer ID, title, description, priority, and status are required",
    );
  }
  //Verify customer exists
  const customer = await prisma.customer.findUnique({
    where: { id: customerId, status: "ACTIVE" },
  });
  if (!customer) {
    throw new Error("Customer not found");
  }

  //Count active tickets per agent
  const workLoad = await prisma.ticket.groupBy({
    by: ["assignedToUser"],
    where: {
      assignedToUser: {
        not: null,
      },
      status: {
        in: ["OPEN", "IN_PROGRESS"],
      },
    },
    _count: {
      id: true,
    },
  });

  //Load balancing logic for assigning tickets to agents (least loaded agent)
  const agents = await prisma.user.findMany({
    where: { role: "AGENT" }, // get all agents
  });
  //Merge them
  const agentLoads = agents.map((agent) => {
    const load =
      workLoad.find((item) => item.assignedToUser === agent.id)?._count.id ?? 0;
    return { ...agent, load };
  });

  //sort agents by load
  agentLoads.sort((a, b) => a.load - b.load);
  const leastLoadedAgent = agentLoads[0];

  // Create ticket
  const newTicket = await prisma.ticket.create({
    data: {
      customerId,
      title,
      description,
      priority: data.priority.toUpperCase() as TicketPriority,
      status: data.status.toUpperCase() as TicketStatus,
      assignedToUser: leastLoadedAgent.id,
    },
  });

  return {
    message: "Ticket created successfully",
    ticket: newTicket,
  };
};

//Get all tickets
export const getAllTickets = async () => {
  const tickets = await prisma.ticket.findMany({
    include: {
      customer: {
        select: {
          id: true,
          companyName: true,
          contactName: true,
          email: true,
        },
      },
      assignedUser: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return tickets;
};

//Get ticket by ID
export const getTicketById = async (ticketId: number) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      customer: {
        select: {
          id: true,
          companyName: true,
          contactName: true,
          email: true,
        },
      },
      assignedUser: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  return ticket;
};

//Update ticket status
export const updateTicketStatus = async (
  ticketId: number,
  status: TicketStatus,
) => {
    const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }
  // Validate status
  if (
    !Object.values(TicketStatus).includes(status.toUpperCase() as TicketStatus)
  ) {
    throw new Error("Invalid status value");
  }
  const updatedTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: { status: status.toUpperCase() as TicketStatus },
  });

  return {
    message: "Ticket status updated successfully",
    ticket: updatedTicket,
  };
};
