import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components'

interface ForgotPasswordEmailProps {
  username: string
  userEmail: string
  resetUrl: string
}

const ForgotPasswordEmailTemplate = (props: ForgotPasswordEmailProps) => {
  const { username, userEmail, resetUrl } = props

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password - Action required</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="mx-auto bg-white rounded-[8px] shadow-sm max-w-[600px] px-[48px] py-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[32px] font-bold text-gray-900 m-0 mb-[8px]">
                Password Reset Request
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                Hello  {username},
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                We received a request to reset the password for your account associated with <strong>{userEmail}</strong>.
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[24px] m-0">
                Click the button below to create a new password. This link will expire in 24 hours for security reasons.
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={resetUrl}
                className="bg-blue-600 text-white font-semibold py-[12px] px-[24px] rounded-[6px] text-[16px] no-underline box-border hover:bg-blue-700"
              >
                Reset My Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 mb-[16px] m-0">
                If the button above doesn&apos;t work, copy and paste the following link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all m-0">
                {resetUrl}
              </Text>
            </Section>

            {/* Security Notice */}
            <Section className="border-t border-gray-200 pt-[24px] mb-[24px]">
              <Text className="text-[14px] text-gray-600 mb-[12px] m-0">
                <strong>Security Notice:</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                • If you didn&apos;t request this password reset, please ignore this email
              </Text>
              <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                • This link will expire in 24 hours
              </Text>
              <Text className="text-[14px] text-gray-600 m-0">
                • For security, never share this link with anyone
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                This email was sent to {userEmail}
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                © 2026 Your Company Name. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                123 Business Street, Golden, CO 80401
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ForgotPasswordEmailTemplate