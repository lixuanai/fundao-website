import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function sendContactNotification(
  to: string,
  contact: { name: string; email: string; subject: string; message: string }
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'FunDAO Website <onboarding@resend.dev>',
      to: [to],
      subject: `新联系消息: ${contact.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7C3AED;">FunDAO 网站新联系消息</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>姓名:</strong> ${contact.name}</p>
            <p><strong>邮箱:</strong> ${contact.email}</p>
            <p><strong>主题:</strong> ${contact.subject}</p>
            <p><strong>消息:</strong></p>
            <p style="white-space: pre-wrap;">${contact.message}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">此邮件由 FunDAO 网站联系表单自动发送</p>
        </div>
      `,
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Email exception:', err);
    return { success: false, error: err };
  }
}
