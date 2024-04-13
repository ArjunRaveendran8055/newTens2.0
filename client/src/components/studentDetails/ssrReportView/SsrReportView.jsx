import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const demmyReports = [
  {
    callType: "study call",
    reason: "kuttiyude oru reportum classil ninnu varathathukond vilichathanu",
    response: "nannayi padikkarund nalla pole class shredhikunund",
    time: "2024-03-25T09:01:01.090+00:00",
  },
  {
    callType: "2study call",
    reason: "2kuttiyude oru reportum classil ninnu varathathukond vilichathanu",
    response: "2nannayi padikkarund nalla pole class shredhikunund",
    time: "22024-03-25T09:01:01.090+00:00",
  },
  {
    callType: "2study call",
    reason: "2kuttiyude oru reportum classil ninnu varathathukond vilichathanu",
    response: "2nannayi padikkarund nalla pole class shredhikunund",
    time: "22024-03-25T09:01:01.090+00:00",
  },
  {
    callType: "2study call",
    reason: "2kuttiyude oru reportum classil ninnu varathathukond vilichathanu",
    response: "2nannayi padikkarund nalla pole class shredhikunund",
    time: "22024-03-25T09:01:01.090+00:00",
  },
];

export function SsrReportView() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div>
      <div className="descDiv basis-1/2 font-enriq sm:text-xl md:text-2xl lg:text-md w-full  rounded-3xl lg:p-10 sm:p-3 md:p-5 flex flex-col gap-2 shadow-2xl h-[83vh]">
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            What is Material Tailwind?
          </AccordionHeader>
          <AccordionBody>
            We&apos;re not always in the position that we want to be at.
            We&apos;re constantly growing. We&apos;re constantly making
            mistakes. We&apos;re constantly trying to express ourselves and
            actualize our dreams.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            How to use Material Tailwind?
          </AccordionHeader>
          <AccordionBody>
            We&apos;re not always in the position that we want to be at.
            We&apos;re constantly growing. We&apos;re constantly making
            mistakes. We&apos;re constantly trying to express ourselves and
            actualize our dreams.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(3)}>
            What can I do with Material Tailwind?
          </AccordionHeader>
          <AccordionBody>
            We&apos;re not always in the position that we want to be at.
            We&apos;re constantly growing. We&apos;re constantly making
            mistakes. We&apos;re constantly trying to express ourselves and
            actualize our dreams.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(4)}>
            What can I do with Material Tailwind?
          </AccordionHeader>
          <AccordionBody>
            We&apos;re not always in the position that we want to be at.
            We&apos;re constantly growing. We&apos;re constantly making
            mistakes. We&apos;re constantly trying to express ourselves and
            actualize our dreams.
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  );
}
