import {
    Body,
    Container,
    Column,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
    Heading,
} from '@react-email/components';
import * as React from 'react';

interface OrderDetails {
    orderNumber: string;
    userName: string;
    userEmail: string;
    userAddress: string;
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

export const AdminOrderEmail = ({
    orderNumber,
    userName,
    userEmail,
    userAddress,
    material,
    quality,
    color,
    infill,
    quantity,
    volume,
    totalPrice,
    message,
    fileName,
}: OrderDetails) => {
    return (
        <Html>
            <Head />
            <Preview>New 3D Print Order: {orderNumber}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section>
                        <Heading as="h1">New 3D Print Order</Heading>
                        <Text style={orderNumberStyle}>Order #{orderNumber}</Text>
                    </Section>

                    <Section style={section}>
                        <Heading as="h2" style={subheading}>Customer Details</Heading>
                        <Row>
                            <Column>
                                <Text style={label}>Name:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{userName}</Text>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Text style={label}>Address:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{userAddress}</Text>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Text style={label}>Email:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{userEmail}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Hr style={hr} />

                    <Section style={section}>
                        <Heading as="h2" style={subheading}>Order Specifications</Heading>
                        <Row>
                            <Column>
                                <Text style={label}>Material:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{material}</Text>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Text style={label}>Quality:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{quality}</Text>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Text style={label}>Color:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{color}</Text>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Text style={label}>Infill:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{infill}</Text>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Text style={label}>Quantity:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{quantity}</Text>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Text style={label}>Model Volume:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{volume}</Text>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Text style={label}>File name:</Text>
                            </Column>
                            <Column>
                                <Text style={value}>{fileName}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Hr style={hr} />

                    <Section style={section}>
                        <Heading as="h2" style={subheading}>Price</Heading>
                        <Row>
                            <Column>
                                <Text style={labelTotal}>Total:</Text>
                            </Column>
                            <Column>
                                <Text style={total}>{totalPrice}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Hr style={hr} />

                    <Section style={section}>
                        <Heading as="h2" style={subheading}>Additional Message</Heading>
                        <Text style={messageStyle}>{message}</Text>
                    </Section>

                    <Hr style={hr} />

                    <Section style={footer}>
                        <Text style={footerText}>
                            This email contains an STL file attachment. Please check the admin dashboard for more details or reply to this email to contact the customer directly.
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

const section = {
    padding: '0 24px',
};

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
};

const subheading = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    margin: '16px 0',
};

const label = {
    fontSize: '14px',
    color: '#667085',
    margin: '8px 0',
};

const value = {
    fontSize: '14px',
    color: '#1d2939',
    margin: '8px 0',
};

const labelTotal = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#667085',
    margin: '8px 0',
};

const total = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1d2939',
    margin: '8px 0',
};

const orderNumberStyle = {
    fontSize: '16px',
    color: '#667085',
    marginTop: '0',
};

const messageStyle = {
    fontSize: '14px',
    color: '#1d2939',
    margin: '8px 0',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '4px',
};

const footer = {
    padding: '0 24px',
    textAlign: 'center' as const,
};

const footerText = {
    fontSize: '12px',
    color: '#667085',
};

export default AdminOrderEmail;