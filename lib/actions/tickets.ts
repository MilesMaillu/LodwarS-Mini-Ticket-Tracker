"use server";

import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { z } from "zod";

const TicketSchema = z.object({
  title: z.string().min(1, "Ticket title is required"),
  description: z.string().optional(),
});

export async function deleteTicket(formData: FormData) {
  const id = String(formData.get("id") || "");

  await prisma.ticket.deleteMany({
    where: { id: id },
  });
}

export async function updateStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");

  await prisma.ticket.updateMany({
    where: { id: Number(id) }, 
    data: { status: status }
  });
  redirect("/tickets");
}

export async function createTicket(formData: FormData) {
  const parsed = TicketSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    throw new Error("Validation failed");
  }

  try {
    await prisma.ticket.create({
      data: { ...parsed.data },
    });
    redirect("/tickets");
  } catch (error) {
    throw new Error("Failed to create ticket.");
  }
}
