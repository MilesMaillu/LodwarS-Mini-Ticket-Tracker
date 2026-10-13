import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to tickets
  redirect('/tickets');

}
