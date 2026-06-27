import { PrismaClient } from "@prisma/client";
import { Ticket } from "@prisma/client";
import { TicketPriority } from "@prisma/client";
const prisma = new PrismaClient();

interface TicketData {
  customerId: number;
  title: string;
  description: string;
  priority: TicketPriority;
  status?: string;
}
//Create a new ticket
export const createTicket = async (data: TicketData) => {
  const { customerId, title, description, priority } = data;

  // Basic validation
  if (!customerId || !title || !description || !priority) {
    throw new Error(
      "Customer ID, title, description, and priority are required",
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
      status: "OPEN",
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
