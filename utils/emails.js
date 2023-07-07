import nodemailer from 'nodemailer';

/**
 * Send register email with nodemailer.
 * 
 * @param {Object} data 
 */
export const registerEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const { email, name, token } = data;

    await transport.sendMail({
        from: 'BienesRaíces.com',
        to: email,
        subject: 'Confirma tu cuenta en BienesRaíces.com',
        text: 'Confirma tu cuenta en BienesRaíces.com',
        html: /* html */ `
            <h3>
                Hola ${name}, por favor comprueba tu cuenta en BienesRaíces.com
            </h3>
            
            <p>
                Para terminar el proceso de registro necesitamos que confirmes tu cuenta en el siguiente enlace:
                <a href="">Confirmar cuenta</a>
            </p>

            <p>
                Si no has sido tu quien creará esta cuenta, puedes ignorar el mensaje
            </p>
        `,
    });
};