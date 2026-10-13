"use server";

import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { z } from "zod";

const TicketSchema = z.object({
  title: z.string().min(1, "Ticket title is required"),
  description: z.string().optional(),
});

export async function deleteTicket(formData: FormData) {
  const id = Number(formData.get("id") || "");

  await prisma.ticket.deleteMany({
    where: { id: Number(id) },
  });
  redirect("/tickets");
}

export async function updateStatus(formData: FormData) {
  const id = Number(formData.get("id") || "");
  const status = String(formData.get("status") || "");

  await prisma.ticket.updateMany({
    where: { id: Number(id) }, 
    data: { status: status }
  });
  redirect("/tickets");
}

export async function createTicket(formData: FormData) {
  // 1. Extract values safely from the HTML FormData object
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string;

  // 2. Add a simple validation check to prevent empty submissions
  if (!title) {
    throw new Error("Title field is required.");
  }

  // 3. Write securely to Prisma
  await prisma.ticket.create({
    data: {
      title: title,
      description: description ?? "", // Fallback if description is blank
      status: "open",
      priority: priority,      
    },
  });

  redirect("/tickets");
}
/* export async function createTicket(formData: FormData) {
  const parsed = TicketSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    status: "open",
    priority: "medium",
  });

  if (!parsed.success) {
    throw new Error("Validation failed");
  }

  try {
    await prisma.ticket.create({
      data: { 
        ...parsed.data,  
      },
    });
    redirect("/tickets");
  } catch (error) {
    throw new Error("Failed to create ticket.");
  }
} */
