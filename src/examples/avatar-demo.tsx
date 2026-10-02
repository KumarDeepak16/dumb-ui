import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const people = [
  { name: "Deepak Kumar", initials: "DK", img: "deepak", status: "online" as const },
  { name: "Ravi Menon", initials: "RM", img: "ravi", status: "away" as const },
  { name: "Lena Sato", initials: "LS", img: "lena", status: "busy" as const },
  { name: "Jonas Teller", initials: "JT", img: undefined, status: "offline" as const },
]

export default function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      {people.map((person) => (
        <Avatar key={person.name} status={person.status}>
          {person.img && (
            <AvatarImage
              src={`/avatars/${person.img}.svg`}
              alt={person.name}
            />
          )}
          <AvatarFallback>{person.initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  )
}
