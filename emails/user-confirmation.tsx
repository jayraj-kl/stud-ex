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

interface UserConfirmationEmailProps {
  username?: string;
  ticketId: string;
  subject: string;
  category: string;
  priority: string;
}

export const UserConfirmationEmail = ({
  username,
  ticketId,
  subject,
  category,
  priority,
}: UserConfirmationEmailProps) => {
  const previewText = `Your support request has been received`;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Preview>{previewText}</Preview>
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
              Support Request Received
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We have received your support request and our team will look into
              it shortly. Here are your ticket details:
            </Text>
            <Section className="bg-gray-50 p-4 rounded-lg my-4">
              <Text className="text-black text-[14px] leading-[24px]">
                Ticket ID: {ticketId}
                <br />
                Subject: {subject}
                <br />
                Category: {category}
                <br />
                Priority: {priority}
              </Text>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              We'll keep you updated on the progress of your request.
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you need immediate assistance, please contact our support team
              directly.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default UserConfirmationEmail;
