import nodemailer from 'nodemailer';

/**
 * SMTP configuration.
 */
const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

/**
 * Send register email with nodemailer.
 * 
 * @param {Object} data 
 */
export const registerEmail = async (data) => {
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
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar-cuenta/${token}">
                    Confirmar cuenta
                </a>
            </p>

            <p>
                Si no has sido tu quien creó esta cuenta, puedes ignorar este mensaje.
            </p>
        `,
    });
};

/**
 * Send instructions by email to reset password.
 * 
 * @param {Object} data 
 */
export const resetPasswordEmail = async (data) => {
    const { email, name, token } = data;

    await transport.sendMail({
        from: 'BienesRaíces.com',
        to: email,
        subject: 'Restablece tu contraseña en BienesRaíces.com',
        text: 'Restablece tu contraseña en BienesRaíces.com',
        html: /* html */ `
            <h3>
                Hola ${name}, has solicitado restablecer tu contraseña en BienesRaíces.com
            </h3>
            
            <p>
                Por favor has click en el siguiente enlace para generar una nueva contraseña:
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-contrasena/${token}">
                    Restablecer contraseña
                </a>
            </p>

            <p>
                Si no has solicitado el cambio de contraseña, puedes ignorar este mensaje.
            </p>
        `,
    });
};