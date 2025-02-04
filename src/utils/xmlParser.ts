import { XMLParser, XMLBuilder } from 'fast-xml-parser';

export const parseHandlingFile = (xmlContent: string) => {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    textNodeName: "value",
  });

  const parsed = parser.parse(xmlContent);
  return parsed.CHandlingDataMgr.HandlingData.Item;
};

export const buildHandlingFile = (handlingData: any[]) => {
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    attributeNamePrefix: "",
    textNodeName: "value",
  });

  const xmlContent = builder.build({
    CHandlingDataMgr: {
      HandlingData: {
        Item: handlingData
      }
    }
  });

  return '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlContent;
};