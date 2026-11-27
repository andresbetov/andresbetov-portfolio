import type { Tier } from "./tiers";

export type JourneyNode = {
  id: string;
  tier: Tier;
  title: string;
  subtitle: string;
  mobileSubtitle?: string;
  icon: string;
  focus?: boolean;
};

export type JourneyBand = {
  tier: Extract<Tier, "edge" | "services" | "data">;
  label: string;
  description: string;
  nodes: readonly JourneyNode[];
};

export type StackItem = {
  label: string;
  tier: Tier;
};

export type LegendItem = {
  variant: "solid" | "dashed";
  label: string;
};

export type ServiceStation = {
  tier: Tier;
  title: string;
  description: string;
};

export type CodePart = {
  text?: string;
  tone?: "primary" | "edge" | "services";
  wbr?: boolean;
};

export type CodeCommand = {
  parts: readonly CodePart[];
};

export type ProjectLink = {
  label: string;
  href: string;
  icon: string;
  variant: "primary" | "secondary";
};

const client: JourneyNode = {
  id: "client",
  tier: "edge",
  title: "client",
  subtitle: "HTTP",
  icon: "monitor",
};

const apiGateway: JourneyNode = {
  id: "api-gateway",
  tier: "edge",
  title: "api-gateway",
  subtitle: "WebFlux",
  icon: "swap",
};

const configService: JourneyNode = {
  id: "config-service",
  tier: "services",
  title: "config-service",
  subtitle: "Config Server",
  icon: "sliders",
};

const discoveryService: JourneyNode = {
  id: "discovery-service",
  tier: "services",
  title: "discovery-service",
  subtitle: "Eureka",
  icon: "network",
};

const inventoryService: JourneyNode = {
  id: "inventory-service",
  tier: "services",
  title: "inventory-service",
  subtitle: "inventory domain",
  icon: "package",
};

const unitOfMeasureService: JourneyNode = {
  id: "unit-of-measure-service",
  tier: "services",
  title: "unit-of-measure-service",
  subtitle: "reference data",
  icon: "ruler",
  focus: true,
};

const inventoryDatabase: JourneyNode = {
  id: "inventory-database",
  tier: "data",
  title: "PostgreSQL",
  subtitle: "inventory_db",
  icon: "database",
};

const vault: JourneyNode = {
  id: "vault",
  tier: "security",
  title: "Vault",
  subtitle: "secrets",
  mobileSubtitle: "secrets for every service",
  icon: "lock",
};

const unitDatabase: JourneyNode = {
  id: "unit-database",
  tier: "data",
  title: "PostgreSQL",
  subtitle: "unit_of_measure_db",
  icon: "database",
};

export const elara = {
  meta: {
    featured: "FEATURED PROJECT",
    name: "ELARA",
    projectIndex: 1,
    projectCount: 3,
    chips: ["Inventory item data", "Reference implementation", "Demo v1.3.1"],
  },
  titleLines: [
    "Designing a distributed system",
    "without losing clarity inside each service.",
  ],
  subtitle:
    "Elara is a Spring Cloud microservices platform for inventory item data and units of measure. It separates services and databases, with well-defined internal layers and global exception handling.",
  stack: [
    { label: "Java 21", tier: "edge" },
    { label: "Spring Boot 3.5", tier: "services" },
    { label: "Spring Cloud", tier: "services" },
    { label: "Spring Data JPA", tier: "data" },
  ] satisfies readonly StackItem[],
  legend: [
    { variant: "solid", label: "Request flow" },
    { variant: "dashed", label: "Platform support" },
  ] satisfies readonly LegendItem[],
  journey: {
    label: "JOURNEY OF A REQUEST",
    description:
      "The diagram shows how the gateway routes a request to the responsible service and how business services interact when they need to validate a reference, keeping their data separated by domain.",
    bands: {
      client: {
        tier: "edge",
        label: "Client",
        description: "Browser or app",
        nodes: [client],
      },
      edge: {
        tier: "edge",
        label: "Edge",
        description: "Single entry point for every request",
        nodes: [apiGateway],
      },
      services: {
        tier: "services",
        label: "Services",
        description: "Business logic and platform",
        platform: [configService, discoveryService],
        domain: [inventoryService, unitOfMeasureService],
        mobilePlatform: {
          title: "Platform support",
          subtitle: "config-service · discovery-service",
          icon: "sliders",
        },
      },
      data: {
        tier: "data",
        label: "Data and secrets",
        description: "Storage and credentials",
        nodes: [inventoryDatabase, vault, unitDatabase],
      },
    } satisfies {
      client: JourneyBand;
      edge: JourneyBand;
      services: {
        tier: "services";
        label: string;
        description: string;
        platform: readonly JourneyNode[];
        domain: readonly JourneyNode[];
        mobilePlatform: {
          title: string;
          subtitle: string;
          icon: string;
        };
      };
      data: JourneyBand;
    },
  },
  decisions: {
    tag: {
      icon: "component",
      label: "System design",
    },
    title: "Key decisions",
    description:
      "How Elara separates business domains, structures services, verifies quality, and coordinates its platform.",
    items: [
      { icon: "square-dashed", label: "Domain boundaries" },
      { icon: "layers", label: "Layered design" },
      { icon: "badge-check", label: "Verifiable quality" },
      { icon: "config-sliders", label: "Centralized configuration" },
    ],
  },
  service: {
    label: "INSIDE EVERY SERVICE",
    main: [
      {
        tier: "edge",
        title: "Controller",
        description: "Request and response DTOs",
      },
      {
        tier: "services",
        title: "Service",
        description: "Interface and implementation",
      },
    ] satisfies readonly ServiceStation[],
    paths: [
      {
        tier: "data",
        title: "Repository",
        description: "Entity and mapper",
      },
      {
        tier: "fault",
        title: "Exceptions",
        description: "Custom exceptions and one global handler",
      },
    ] satisfies readonly ServiceStation[],
  },
  demo: {
    label: "RUN IT LOCALLY",
    description:
      "Start the Elara demo with Docker Compose and check its service logs in real time.",
    language: "bash",
    copyLabel: "Copy",
    commands: [
      {
        parts: [
          { text: "export", tone: "primary" },
          { text: " " },
          { text: "ELARA", tone: "edge" },
          { text: "=" },
          { text: '"oci://ghcr.io/', tone: "services" },
          { wbr: true },
          { text: 'elara-app/elara-demo:1.3.1"', tone: "services" },
        ],
      },
      {
        parts: [
          { text: "sudo docker compose", tone: "primary" },
          { text: " -f " },
          { text: '"$ELARA"', tone: "services" },
          { text: " up -d --wait --wait-timeout 900" },
        ],
      },
      {
        parts: [
          { text: "curl", tone: "primary" },
          { text: " -fsS " },
          {
            text: "http://127.0.0.1:8080/api/v1/inventory/item/7",
            tone: "services",
          },
        ],
      },
      {
        parts: [
          { text: "sudo docker compose", tone: "primary" },
          { text: " -f " },
          { text: '"$ELARA"', tone: "services" },
          { text: " logs -f" },
        ],
      },
    ] satisfies readonly CodeCommand[],
    resourcesLabel: "EXPLORE THE PROJECT",
    links: [
      {
        label: "GitHub organization",
        href: "https://github.com/elara-app/",
        icon: "github",
        variant: "secondary",
      },
      {
        label: "API documentation",
        href: "https://github.com/elara-app/inventory-service#api",
        icon: "book-open",
        variant: "secondary",
      },
      {
        label: "Final report",
        href: "https://zenodo.org/records/23679956",
        icon: "file-text",
        variant: "primary",
      },
    ] satisfies readonly ProjectLink[],
  },
} as const;
