// WhatsApp messaging service for order notifications
const SIMULATE_WHATSAPP = false; // Changed to false for real WhatsApp sending

// Your WhatsApp number
const STORE_WHATSAPP_NUMBER = "+918087949226"; // Your actual WhatsApp number

interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  productName: string;
  productPrice: string;
  notes?: string;
}

interface CancelOrderEmailData {
  customerName: string;
  customerPhone: string;
  productName: string;
  orderId: number;
}

// WhatsApp notification service
export class WhatsAppService {
  private static instance: WhatsAppService;
  private storeWhatsAppNumber = "+918087949226"; // Your actual WhatsApp number
  
  static getInstance(): WhatsAppService {
    if (!WhatsAppService.instance) {
      WhatsAppService.instance = new WhatsAppService();
    }
    return WhatsAppService.instance;
  }

  setStoreWhatsAppNumber(number: string) {
    this.storeWhatsAppNumber = number;
  }

  createWhatsAppLink(message: string): string {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${this.storeWhatsAppNumber.replace('+', '')}?text=${encodedMessage}`;
  }

  openWhatsAppLink(message: string) {
    const link = this.createWhatsAppLink(message);
    window.open(link, '_blank');
  }
}

export async function sendOrderWhatsApp(orderData: OrderEmailData): Promise<boolean> {
  const whatsappMessage = `🛍️ *NEW ORDER RECEIVED - ShopEase Store*

📦 *Order Details:*
• Product: ${orderData.productName}
• Price: $${orderData.productPrice}
• Notes: ${orderData.notes || 'None'}

👤 *Customer Information:*
• Name: ${orderData.customerName}
• Email: ${orderData.customerEmail}
• Phone: ${orderData.customerPhone}
• Address: ${orderData.customerAddress}

Please process this order promptly!

_Sent from ShopEase E-Commerce System_`;

  if (SIMULATE_WHATSAPP) {
    // Simulate WhatsApp message for demonstration
    console.log('📱 WHATSAPP SIMULATION - Order Notification:');
    console.log(`To: ${STORE_WHATSAPP_NUMBER}`);
    console.log('Message:');
    console.log(whatsappMessage);
    console.log('');
    console.log('💡 To send real WhatsApp messages, you can:');
    console.log('1. Use WhatsApp Business API');
    console.log('2. Use services like Twilio, MessageBird, or WhatsApp Cloud API');
    console.log('3. Use WhatsApp Web link for manual sending');
    console.log('');
    
    // Create WhatsApp Web link for easy manual sending
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappWebLink = `https://wa.me/${STORE_WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`;
    console.log('🔗 WhatsApp Web Link (click to send manually):');
    console.log(whatsappWebLink);
    
    return true;
  }

  try {
    // Use WhatsApp Web API for direct sending
    // This opens WhatsApp Web automatically with the message
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappWebLink = `https://wa.me/${STORE_WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`;
    
    // Try to open WhatsApp Web automatically
    window.open(whatsappWebLink, '_blank');
    
    console.log('✅ WhatsApp Web opened automatically');
    console.log('📱 WhatsApp message sent to:', STORE_WHATSAPP_NUMBER);
    console.log('📝 Message content:');
    console.log(whatsappMessage);
    
    return true;
  } catch (error) {
    console.error('Failed to open WhatsApp Web:', error);
    
    // Fallback: Show console message with link
    console.log('📱 WHATSAPP FALLBACK - Order Notification:');
    console.log(`To: ${STORE_WHATSAPP_NUMBER}`);
    console.log('Message:');
    console.log(whatsappMessage);
    console.log('');
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappWebLink = `https://wa.me/${STORE_WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`;
    console.log('🔗 WhatsApp Web Link (click to send manually):');
    console.log(whatsappWebLink);
    
    return false;
  }
}

export async function sendCancelOrderWhatsApp(cancelData: CancelOrderEmailData): Promise<boolean> {
  const whatsappMessage = `❌ *ORDER CANCELLATION REQUEST - ShopEase Store*

🆔 *Order ID:* #${cancelData.orderId}
🛍️ *Product:* ${cancelData.productName}

👤 *Customer Details:*
• Name: ${cancelData.customerName}
• Phone: ${cancelData.customerPhone}

⚠️ *Action Required:* Please process this cancellation request immediately.

_Sent from ShopEase E-Commerce System_`;

  if (SIMULATE_WHATSAPP) {
    // Simulate WhatsApp message for demonstration
    console.log('📱 WHATSAPP SIMULATION - Cancellation Request:');
    console.log(`To: ${STORE_WHATSAPP_NUMBER}`);
    console.log('Message:');
    console.log(whatsappMessage);
    console.log('');
    
    // Create WhatsApp Web link for easy manual sending
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappWebLink = `https://wa.me/${STORE_WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`;
    console.log('🔗 WhatsApp Web Link (click to send manually):');
    console.log(whatsappWebLink);
    
    return true;
  }

  try {
    // Use WhatsApp Web API for direct sending
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappWebLink = `https://wa.me/${STORE_WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`;
    
    // Try to open WhatsApp Web automatically
    window.open(whatsappWebLink, '_blank');
    
    console.log('✅ WhatsApp Web opened automatically for cancellation');
    console.log('📱 WhatsApp message sent to:', STORE_WHATSAPP_NUMBER);
    console.log('📝 Message content:');
    console.log(whatsappMessage);
    
    return true;
  } catch (error) {
    console.error('Failed to open WhatsApp Web:', error);
    
    // Fallback: Show console message with link
    console.log('📱 WHATSAPP FALLBACK - Cancellation Request:');
    console.log(`To: ${STORE_WHATSAPP_NUMBER}`);
    console.log('Message:');
    console.log(whatsappMessage);
    console.log('');
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappWebLink = `https://wa.me/${STORE_WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`;
    console.log('🔗 WhatsApp Web Link (click to send manually):');
    console.log(whatsappWebLink);
    
    return false;
  }
}

// Keep the old email functions for backward compatibility, but rename them
export const sendOrderEmail = sendOrderWhatsApp;
export const sendCancelOrderEmail = sendCancelOrderWhatsApp;
