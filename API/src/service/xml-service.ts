import parser from 'fast-xml-parser';
import { options } from '../config/xml-config';

export function parseXML(XML) {
  try {
    const parsedXML = parser.parse(XML, options);
    return parsedXML.TimeZones.TimeZone.map((obj, i) => obj);
  } catch (e) {
    throw new Error(e);
  }
}
