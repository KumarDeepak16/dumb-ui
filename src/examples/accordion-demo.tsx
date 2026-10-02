import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Do the three styles change the component API?",
    a: "No. A style is a token set. The same props and markup render as Raw, Silk or Volume.",
  },
  {
    q: "Can I use Dumb UI next to my existing shadcn/ui components?",
    a: "Yes. Color tokens keep shadcn names, so your other components pick up the active style's palette.",
  },
  {
    q: "How do I make my own style?",
    a: "Copy a style block in dumb-ui.css, rename the data-style value and change the tokens. No component code changes.",
  },
]

export default function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-0"
      className="w-full max-w-lg"
    >
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.q} value={`item-${index}`}>
          <AccordionTrigger>{faq.q}</AccordionTrigger>
          <AccordionContent>{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
