import * as React from 'react'
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

interface VerifyEmailProps {
  username: string
  verifyUrl: string
}

const EmailVerificationTemplate = ({ username, verifyUrl }: VerifyEmailProps) => {

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Please verify your email address to complete your registration</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] p-[40px] max-w-[600px] mx-auto">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[24px] font-bold text-gray-900 m-0">
                Verify Your Email Address
              </Heading>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Hi there, {username}!,
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Thanks for signing up! To complete your registration and start using your account,
                please verify your email address by clicking the button below.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                This verification link will expire in 24 hours for security purposes.
              </Text>
            </Section>

            {/* Verification Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={verifyUrl}
                className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[8px] text-[16px] font-semibold no-underline box-border"
              >
                Verify Email Address
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                If the button doesn&apos;t work, you can copy and paste this link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 leading-[20px] break-all">
                {verifyUrl}
              </Text>
            </Section>

            {/* Help Section */}
            <Section className="mb-[32px] border-t border-gray-200 pt-[24px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                Didn&apos;t request this email? You can safely ignore it.
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px]">
                If you have any questions, feel free to contact our support team.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                © 2026 Your Company Name. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                123 Business Street, Golden, CO 80401
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                <a href="#" className="text-gray-500 underline">Unsubscribe</a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default EmailVerificationTemplate