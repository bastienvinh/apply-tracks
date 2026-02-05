
// All ISO 3166-1 alpha-2 country codes
const countryCodes = [
  "AF","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ",
  "BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BA","BW","BR","BN","BG","BF","BI",
  "KH","CM","CA","CV","KY","CF","TD","CL","CN","CX","CC","CO","KM","CG","CD","CR","CI","HR",
  "CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ","FI",
  "FR","GF","PF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GN","GW","GY",
  "HT","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI",
  "KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","MG","MW","MY","MV",
  "ML","MT","MH","MQ","MR","MU","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR",
  "NP","NL","NC","NZ","NI","NE","NG","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PL",
  "PT","PR","QA","RO","RU","RW","SA","SN","RS","SC","SL","SG","SK","SI","SB","SO","ZA","ES",
  "LK","SD","SR","SZ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TO","TT","TN","TR","TM",
  "TC","UG","UA","AE","GB","US","UY","UZ","VU","VA","VE","VN","YE","ZM","ZW"
];

// Create Intl.DisplayNames instance
const regionNames = new Intl.DisplayNames(['fr'], { type: 'region' });

// Convert codes to country names
const countries = countryCodes.map(code => ({
  code,
  name: regionNames.of(code)
}));

export class CountryService {
  public static getAll() {
    return countries;
  }

  public static getByName(name: string): { code: string, name: string }[] {
    return (countries.filter(country => country.name?.toLowerCase().includes(name.toLowerCase())) ?? []) as { code: string, name: string }[];
  }
}