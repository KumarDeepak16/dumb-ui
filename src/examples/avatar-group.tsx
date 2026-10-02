import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"

const team = [
  { initials: "DK", img: "deepak", name: "Deepak Kumar" },
  { initials: "RM", img: "ravi", name: "Ravi Menon" },
  { initials: "LS", img: "lena", name: "Lena Sato" },
  { initials: "AK", img: "aditi", name: "Aditi Kapoor" },
  { initials: "TB", img: "tomas", name: "Tomás Bravo" },
  { initials: "NA", img: "noor", name: "Noor Ahmed" },
]

export default function AvatarGroupDemo() {
  return (
    <div className="flex items-center gap-3">
      <AvatarGroup max={4}>
        {team.map((person) => (
          <Avatar key={person.initials}>
            <AvatarImage
              src={`/avatars/${person.img}.svg`}
              alt={person.name}
            />
            <AvatarFallback>{person.initials}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
      <span className="text-sm text-muted-foreground">6 people on this project</span>
    </div>
  )
}
