import {
  Html,
  Head,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Container,
} from "@react-email/components";

interface VerificationEmailProps {
  userName: string;
  otp: string;
}

export default function VerificationEmail({
  userName,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
      </Head>

      <Preview>Your verification code is {otp}</Preview>

      <Section style={main}>
        <Container style={container}>
          <Heading style={heading}>Verify your email</Heading>

          <Text style={text}>
            Hi <strong>{userName}</strong>,
          </Text>

          <Text style={text}>
            Use the verification code below to complete your sign-up. This code
            is valid for the next <strong>10 minutes</strong>.
          </Text>

          <Row style={otpContainer}>
            <Text style={otpText}>{otp}</Text>
          </Row>

          <Text style={text}>
            If you didn’t request this, you can safely ignore this email.
          </Text>

          <Text style={footer}>— The Team</Text>
        </Container>
      </Section>
    </Html>
  );
}
/* ---------------- Styles ---------------- */

const main = {
  backgroundColor: "#f4f4f5",
  padding: "40px 0",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "32px",
  maxWidth: "480px",
  margin: "0 auto",
  fontFamily: "Inter, Arial, sans-serif",
};

const heading = {
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "16px",
  color: "#111827",
};

const text = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#374151",
  marginBottom: "16px",
};

const otpContainer = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const otpText = {
  fontSize: "28px",
  fontWeight: "700",
  letterSpacing: "6px",
  color: "#111827",
  backgroundColor: "#f9fafb",
  padding: "16px 24px",
  borderRadius: "6px",
  display: "inline-block",
};

const footer = {
  fontSize: "12px",
  color: "#6b7280",
  marginTop: "24px",
};
