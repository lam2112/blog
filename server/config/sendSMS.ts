import { Twilio }  from "twilio";

const accountSid = `${process.env.TWILIO_ACCOUNT_SID}` ;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}` ;
const from = `${process.env.TWILIO_AUTH_TOKEN}`
const client = new Twilio(accountSid, authToken);

export const sendSms = async (to: string, body: string, txt: string) => {
    try {
        console.log(to)
        client.messages.create({
            body: `Blog ${txt} - ${body}`,
            from,
            to
        })
        .then(message => console.log(message));
        
    } catch (err) {
        console.log(err);

    }
}

