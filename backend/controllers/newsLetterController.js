import nodemailer from 'nodemailer';

// Generate OTP
function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}

// Send OTP via email
async function sendOTP(email, otp) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // or 'STARTTLS'
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Verification OTP',
        text: `Your verification OTP is: ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// Verify OTP
function verifyOTP(email, otp, storedOtp) {
    if (otp === storedOtp) {
        return true;
    }
    return false;
}

// Store OTPs in memory for simplicity
const otps = {};

// get user newsGenerateOTP
const newsGenerateOTP = async (req,res) => {
    const { email } = req.body;
    const otp = generateOTP();
    otps[email] = otp;
    const sent = await sendOTP(email, otp);
    if (sent) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
}

// get user newsVerifyOTP
const newsVerifyOTP = async (req,res) => {
    const { email, otp } = req.body;
    const storedOtp = otps[email];
    const isValid = verifyOTP(email, otp, storedOtp);
    if (isValid) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
}

export { newsGenerateOTP, newsVerifyOTP }