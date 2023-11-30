
/**
 * 
 * @param {http.IncomingMessage} req @see https://nodejs.org/api/http.html#http_class_http_incomingmessage
 * @param {http.ServerResponse} res @see https://nodejs.org/api/http.html#http_class_http_serverresponse
 */
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' });
}