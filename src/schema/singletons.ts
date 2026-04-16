import iso639 from "iso-639-1";
import { fields, singleton } from "@keystatic/core";
import { colour } from "./fields/colour.tsx";

const CONTENT_PATH = "src/content/settings";

const getTz = (tz: string, date: Date = new Date()) =>
    new Intl.DateTimeFormat("default", {
      timeZoneName: "short",
      timeZone: tz,
    }).format(date).split(" ")[1],
  getTzOffset = (tz: string, date: Date = new Date()) =>
    new Date(new Intl.DateTimeFormat("default", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: tz,
    }).format(date)).getTime(),
  getTzList = () => {
    let defaultValue = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date(),
      options: { label: string; value: string }[] = [],
      zones = Object.groupBy(
        Intl.supportedValuesOf("timeZone")
          .filter((tz) => !tz.includes("GMT") && !tz.includes("UTC")),
        (tz) => getTz(tz, now),
      ) as Record<string, string[]>;
    for (const zone in zones) {
      const tz = zones[zone][0],
        cities = zones[zone].sort()
          .map((tz) => tz.slice(tz.indexOf("/") + 1).replace(/_/g, " "));
      options.push({ label: `${cities.join(", ")} (${zone})`, value: tz });
      if (zones[zone].includes(defaultValue)) defaultValue = tz;
    }
    return {
      defaultValue,
      options: options.sort((a, b) =>
        getTzOffset(a.value, now) - getTzOffset(b.value, now)
      ),
    };
  };

const metadata = singleton({
  label: "Site metadata",
  path: `${CONTENT_PATH}/general`,
  schema: {
    title: fields.text({
      label: "Site title",
      validation: { isRequired: true },
    }),
    description: fields.text({ label: "Site description" }),
    timezone: fields.select({
      label: "Publication timezone",
      description: "Set the time and date your site is published in.",
      ...getTzList(),
    }),
    language: fields.select({
      label: "Publication language",
      description: "Set the language your site is published in.",
      defaultValue: "en",
      options: iso639.getAllCodes().map((code) => ({
        label: `${iso639.getName(code)} (${code})`,
        value: code,
      })),
    }),
    privacy: fields.url({
      label: "Privacy policy",
      description: "Linked in the site footer.",
    }),
    copyright: fields.url({
      label: "Copyright",
      description: "Linked in the site footer.",
    }),
    terms: fields.url({
      label: "Terms",
      description: "Linked in the site footer.",
    }),
  },
});

const appearance = singleton({
  label: "Site appearance",
  path: `${CONTENT_PATH}/appearance`,
  schema: {
    accent: colour({
      label: "Accent colour",
      defaultValue: "#ff2056",
    }),
    colorScheme: fields.select({
      label: "Colour scheme",
      defaultValue: "auto",
      options: [
        { label: "Auto", value: "auto" },
        { label: "Partial", value: "partial" },
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
      ],
    }),
    favicon: fields.image({
      label: "Publication icon",
      description: "A square social icon, at least 48x48px.",
      validation: { isRequired: true },
    }),
    lightLogo: fields.image({
      label: "Publication logo (light mode)",
      description: "Appears in the site header in light mode.",
      validation: { isRequired: true },
    }),
    darkLogo: fields.image({
      label: "Publication logo (dark mode)",
      description:
        "Appears in the site header in dark mode. Defaults to the light mode publication logo.",
    }),
    featureImageShape: fields.select({
      label: "Feature image shape",
      defaultValue: "cover",
      options: [
        { label: "Natural", value: "natural" },
        { label: "Portrait", value: "portrait" },
        { label: "Landscape", value: "landscape" },
        { label: "Square", value: "square" },
        { label: "Cover", value: "cover" },
      ],
    }),
    footerTitle: fields.text({
      label: "Footer title",
      description: "Large display text, above linked socials in the footer.",
      defaultValue: "Get in touch",
    }),
  },
});

const navigation = singleton({
  label: "Site navigation",
  path: `${CONTENT_PATH}/navigation`,
  schema: {
    primary: fields.array(
      fields.object({
        name: fields.text({
          label: "Name",
          validation: { isRequired: true },
        }),
        link: fields.url({
          label: "Link",
          validation: { isRequired: true },
        }),
      }),
      {
        label: "Primary navigation",
        description: "Linked in the site header and footer.",
        itemLabel: (props) =>
          props.fields.name.value || props.fields.link.value || "",
      },
    ),
    secondary: fields.array(
      fields.object({
        name: fields.text({
          label: "Name",
          validation: { isRequired: true },
        }),
        link: fields.url({
          label: "Link",
          validation: { isRequired: true },
        }),
      }),
      {
        label: "Secondary navigation",
        description: "Linked in the site footer.",
        itemLabel: (props) =>
          props.fields.name.value || props.fields.link.value || "",
      },
    ),
    redirects: fields.array(
      fields.object({
        code: fields.select({
          label: "HTTP Redirect Code",
          defaultValue: "302",
          options: [
            { label: "301 Permanent", value: "301" },
            { label: "302 Temporary", value: "302" },
          ],
        }),
        from: fields.url({
          label: "From URL",
          validation: { isRequired: true },
        }),
        to: fields.url({
          label: "To URL",
          validation: { isRequired: true },
        }),
        regex: fields.checkbox({
          label: "Pattern matching",
          description:
            "Use regular expressions to write redirects with advanced pattern matching.",
        }),
      }),
      {
        label: "Redirects",
        description: "Configure redirects for old or moved content.",
        itemLabel: (props) =>
          `${props.fields.code.value}: ${props.fields.from.value} -> ${props.fields.to.value}`,
      },
    ),
  },
});

const socials = singleton({
  label: "Social accounts",
  path: `${CONTENT_PATH}/socials`,
  schema: {
    instagram: fields.text({
      label: "Instagram profile",
      description: "Linked in the site header and footer.",
    }),
    facebook: fields.text({
      label: "Facebook profile",
      description: "Linked in the site header and footer.",
    }),
    x: fields.text({
      label: "X (Twitter) profile",
      description: "Linked in the site header and footer.",
    }),
    linkedin: fields.text({
      label: "LinkedIn profile",
      description: "Linked in the site header and footer.",
    }),
    youtube: fields.text({
      label: "YouTube channel",
      description: "Linked in the site header and footer.",
    }),
    phone: fields.text({
      label: "Phone number",
      description: "Linked in the site footer.",
    }),
    email: fields.text({
      label: "Email address",
      description: "Linked in the site footer.",
    }),
    postal: fields.text({
      label: "Postal address",
      description: "Linked in the site footer.",
    }),
    newsletter_url: fields.url({
      label: "Newsletter URL",
      description: "A newsletter subscription form submission target.",
    }),
    newsletter_id: fields.url({
      label: "Newsletter ID",
      description:
        "The unique identifier of the list to subscribe to on submission.",
    }),
  },
});

const developer = singleton({
  label: "Developer settings",
  path: `${CONTENT_PATH}/injection`,
  schema: {
    headerCode: fields.text({
      label: "Header code injection",
      description:
        "Code here will be injected into the <head></head> tag on every page of the site.",
      multiline: true,
    }),
    footerCode: fields.text({
      label: "Footer code injection",
      description:
        "Code here will be injected at the end of the <body></body> tag on every page of the site.",
      multiline: true,
    }),
  },
});

const user = fields.object({
    name: fields.text({
      label: "Name",
      validation: { isRequired: true },
    }),
    email: fields.text({
      label: "Email address",
      validation: { isRequired: true },
    }),
  }),
  users = singleton({
    label: "User management",
    path: `${CONTENT_PATH}/users`,
    schema: {
      administrators: fields.array(
        user,
        {
          label: "Administrators",
          description:
            "Trusted users who can manage all content and site settings, including developer settings and users. ",
          itemLabel: (props) =>
            `${props.fields.name.value} (${props.fields.email.value})`,
          validation: { length: { min: 1 } },
        },
      ),
      editors: fields.array(
        user,
        {
          label: "Editors",
          description:
            "Regular users given access to edit site content, site metadata, site appearance, site navigation and social accounts.",
          itemLabel: (props) =>
            `${props.fields.name.value} (${props.fields.email.value})`,
        },
      ),
      contributors: fields.array(
        user,
        {
          label: "Contributors",
          description:
            "Basic users given access to create and edit site content.",
          itemLabel: (props) =>
            `${props.fields.name.value} (${props.fields.email.value})`,
        },
      ),
    },
  });

export { appearance, developer, metadata, navigation, socials, users };
