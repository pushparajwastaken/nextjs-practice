export const users = [
  { id: 1, name: "Pushparaj" },
  { id: 2, name: "Lavanya" },
];
export async function GET() {
  return Response.json(users);
}
export async function POST(request: Request) {
  const user = await request.json();
  const newuser = {
    id: users.length + 1,
    name: user.name,
  };
  users.push(newuser);
  return new Response(JSON.stringify(newuser), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}
