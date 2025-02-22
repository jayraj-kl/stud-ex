import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ManagerNotificationEmailProps {
  ticketId: string;
  subject: string;
  category: string;
  priority: string;
  description: string;
  userEmail: string;
  userName?: string;
}

export const ManagerNotificationEmail = ({
  ticketId,
  subject,
  category,
  priority,
  description,
  userEmail,
  userName,
}: ManagerNotificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Preview>New Support Request: {subject}</Preview>
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://jayraj-kl.github.io/assets-studex.github.io/image/image.png`}
                width="40"
                height="37"
                alt="Company Logo"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              New Support Request
            </Heading>
            <Section className="bg-gray-50 p-4 rounded-lg my-4">
              <Text className="text-black text-[14px] leading-[24px] font-bold">
                Ticket Details:
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Ticket ID: {ticketId}
                <br />
                Subject: {subject}
                <br />
                Category: {category}
                <br />
                Priority: {priority}
                <br />
                User: {userName} ({userEmail})
              </Text>
            </Section>
            <Section className="my-4">
              <Text className="text-black text-[14px] leading-[24px] font-bold">
                Description:
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                {description}
              </Text>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={`${process.env.NEXTAUTH_URL}/dashboard/tickets/${ticketId}`}
              >
                View Ticket
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ManagerNotificationEmail;
