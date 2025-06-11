import {
    Body,
    Container,
    Column,
    Head,
    Hr,
    Html,
    Preview,
    Row,
    Section,
    Text,
    Heading,
    Button,
} from '@react-email/components';

interface OrderDetails {
    orderNumber: string;
    userName: string;
    userEmail: string;
    material: string;
    quality: string;
    color: string;
    infill: string;
    quantity: string;
    volume: string;
    totalPrice: string;
    message: string;
    fileName: string;
}

export const CustomerOrderEmail = ({
    orderNumber,
    userName,
    material,
    quality,
    color,
    infill,
    quantity,
    totalPrice,
    fileName,
}: OrderDetails) => {
    const websiteUrl = 'https://treideee.ro';

    return (
        <Html>
            <Head />
            <Preview>Your 3D Print Order Confirmation: {orderNumber}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={logoContainer}>
                        {/* Replace with your logo */}
                        <Text style={logoText}>Your 3D Printing Service</Text>
                    </Section>

                    <Section style={section}>
                        <Heading as="h1" style={heading}>Thanks for your order, {userName}!</Heading>
                        <Text style={paragraph}>
                            We've received your 3D printing order and are reviewing it now.
                            We'll start processing it as soon as possible.
                        </Text>
                        <Text style={orderNumberStyle}>Order #{orderNumber}</Text>
                    </Section>

                    <Hr style={hr} />

                    <Section style={section}>
                        <Heading as="h2" style={subheading}>Order Summary</Heading>

                        <Row style={summaryRow}>
                            <Column>
                                <Text style={label}>Model:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{fileName}</Text>
                            </Column>
                        </Row>

                        <Row style={summaryRow}>
                            <Column>
                                <Text style={label}>Material:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{material}</Text>
                            </Column>
                        </Row>

                        <Row style={summaryRow}>
                            <Column>
                                <Text style={label}>Quality:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{quality}</Text>
                            </Column>
                        </Row>

                        <Row style={summaryRow}>
                            <Column>
                                <Text style={label}>Color:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{color}</Text>
                            </Column>
                        </Row>

                        <Row style={summaryRow}>
                            <Column>
                                <Text style={label}>Infill:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{infill}</Text>
                            </Column>
                        </Row>

                        <Row style={summaryRow}>
                            <Column>
                                <Text style={label}>Quantity:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{quantity}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={priceContainer}>
                        <Row>
                            <Column>
                                <Text style={priceLabel}>Total:</Text>
                            </Column>
                            <Column>
                                <Text style={priceValue}>{totalPrice}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Hr style={hr} />

                    <Section style={section}>
                        <Text style={paragraph}>
                            We'll contact you once your order is ready. If you have any questions, simply reply to this email.
                        </Text>

                        <Section style={ctaContainer}>
                            <Button href={`${websiteUrl}/orders/${orderNumber}`} style={ctaButton}>
                                View Order Status
                            </Button>
                        </Section>
                    </Section>

                    <Hr style={hr} />

                    <Section style={footer}>
                        <Text style={footerText}>
                            © {new Date().getFullYear()} Your 3D Printing Service. All rights reserved.
                        </Text>
                        <Text style={footerText}>
                            123 Printing Street, Your City, 12345
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: 'Arial, sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0',
    maxWidth: '600px',
};

const logoContainer = {
    padding: '20px 24px',
    textAlign: 'center' as const,
};

const logoText = {
    fontSize: '24px',
    fontWeight: 'bold' as const,
    color: '#4f46e5',
};

const section = {
    padding: '0 24px',
};

const heading = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1d2939',
    margin: '16px 0',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#4b5563',
};

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
};

const subheading = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1d2939',
    margin: '16px 0',
};

const summaryRow = {
    margin: '8px 0',
};

const label = {
    fontSize: '14px',
    color: '#667085',
};

const value = {
    fontSize: '14px',
    color: '#1d2939',
};

const priceContainer = {
    padding: '12px 24px',
    backgroundColor: '#f9fafb',
    margin: '16px 24px',
    borderRadius: '4px',
};

const priceLabel = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1d2939',
};

const priceValue = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#4f46e5',
};

const orderNumberStyle = {
    fontSize: '16px',
    color: '#667085',
};

const ctaContainer = {
    padding: '24px 0',
    textAlign: 'center' as const,
};

const ctaButton = {
    backgroundColor: '#4f46e5',
    borderRadius: '4px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    padding: '12px 24px',
};

const footer = {
    padding: '0 24px 24px',
    textAlign: 'center' as const,
};

const footerText = {
    fontSize: '12px',
    color: '#667085',
    margin: '4px 0',
};

export default CustomerOrderEmail;