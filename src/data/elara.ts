export type TierTone = "edge" | "services" | "data" | "security" | "fault";
export type DiagramTone = Exclude<TierTone, "fault">;
export type DiagramNodeIcon =
  | "monitor"
  | "swap"
  | "sliders"
  | "network"
  | "package"
  | "ruler"
  | "database"
  | "lock";
export type DiagramNodeId =
  | "client"
  | "api-gateway"
  | "config-service"
  | "discovery-service"
  | "inventory-service"
  | "unit-of-measure-service"
  | "inventory-db"
  | "vault"
  | "unit-of-measure-db";

export type DiagramNodeContent = {
  id: DiagramNodeId;
  title: string;
  detail: string;
  icon: DiagramNodeIcon;
  tone: DiagramTone;
};

export type DiagramBandContent = {
  id: "client" | "edge" | "services" | "data";
  label: string;
  description: string;
  tone: DiagramTone;
  nodes: readonly DiagramNodeContent[];
};

export type DecisionIcon =
  "square-dashed" | "layers" | "badge-check" | "sliders-horizontal";

export type DecisionContent = {
  label: string;
  icon: DecisionIcon;
};

export type ServiceStationTone = TierTone;

export type ServiceStationContent = {
  label: string;
  detail: string;
  tone: ServiceStationTone;
};

export type StackItem = {
  label: string;
  tone: DiagramTone;
};

export type LegendItem = {
  label: string;
  style: "solid" | "dashed";
};

export type KeyDecisionTag = {
  label: string;
  icon: "component";
};

export type CommandTone = "primary" | "edge" | "services";

export type CommandSegment = {
  text: string;
  tone?: CommandTone;
  breakBefore?: boolean;
};

export type ResourceLinkContent = {
  label: string;
  href: string;
  icon: "github" | "book-open" | "file-text";
  variant: "primary" | "secondary";
};

const focusNodeId = "unit-of-measure-service" satisfies DiagramNodeId;

export const elara = {
  meta: {
    label: "FEATURED PROJECT",
    name: "ELARA",
    index: 1,
    total: 3,
  },
  tags: ["Inventory item data", "Reference implementation", "Demo v1.3.1"],
  titleLines: [
    "Designing a distributed system",
    "without losing clarity inside each service.",
  ],
  subtitle:
    "Elara is a Spring Cloud microservices platform for inventory item data and units of measure. It separates services and databases, with well-defined internal layers and global exception handling.",
  requestJourney: {
    stack: [
      { label: "Java 21", tone: "edge" },
      { label: "Spring Boot 3.5", tone: "services" },
      { label: "Spring Cloud", tone: "services" },
      { label: "Spring Data JPA", tone: "data" },
    ] satisfies readonly StackItem[],
    legend: [
      { label: "Request flow", style: "solid" },
      { label: "Platform support", style: "dashed" },
    ] satisfies readonly LegendItem[],
    bands: [
      {
        id: "client",
        label: "Client",
        description: "Browser or app",
        tone: "edge",
        nodes: [
          {
            id: "client",
            title: "client",
            detail: "HTTP",
            icon: "monitor",
            tone: "edge",
          },
        ],
      },
      {
        id: "edge",
        label: "Edge",
        description: "Single entry point for every request",
        tone: "edge",
        nodes: [
          {
            id: "api-gateway",
            title: "api-gateway",
            detail: "WebFlux",
            icon: "swap",
            tone: "edge",
          },
        ],
      },
      {
        id: "services",
        label: "Services",
        description: "Business logic and platform",
        tone: "services",
        nodes: [
          {
            id: "config-service",
            title: "config-service",
            detail: "Config Server",
            icon: "sliders",
            tone: "services",
          },
          {
            id: "discovery-service",
            title: "discovery-service",
            detail: "Eureka",
            icon: "network",
            tone: "services",
          },
          {
            id: "inventory-service",
            title: "inventory-service",
            detail: "inventory domain",
            icon: "package",
            tone: "services",
          },
          {
            id: "unit-of-measure-service",
            title: "unit-of-measure-service",
            detail: "reference data",
            icon: "ruler",
            tone: "services",
          },
        ],
      },
      {
        id: "data",
        label: "Data and secrets",
        description: "Storage and credentials",
        tone: "data",
        nodes: [
          {
            id: "inventory-db",
            title: "PostgreSQL",
            detail: "inventory_db",
            icon: "database",
            tone: "data",
          },
          {
            id: "vault",
            title: "Vault",
            detail: "secrets",
            icon: "lock",
            tone: "security",
          },
          {
            id: "unit-of-measure-db",
            title: "PostgreSQL",
            detail: "unit_of_measure_db",
            icon: "database",
            tone: "data",
          },
        ],
      },
    ] satisfies readonly DiagramBandContent[],
    focusNodeId,
    captionLabel: "JOURNEY OF A REQUEST",
    caption:
      "The animation shows how the gateway routes a request to the responsible service and how business services interact when they need to validate a reference, keeping their data separated by domain.",
    connectionSummary:
      "Request flow runs from the client to api-gateway, then to inventory-service and unit-of-measure-service; inventory-service validates its reference against unit-of-measure-service. Platform support links api-gateway to config-service and discovery-service. Data access links inventory-service to PostgreSQL inventory_db and unit-of-measure-service to PostgreSQL unit_of_measure_db. Secrets link inventory-service and unit-of-measure-service to Vault.",
  },
  keyDecisions: {
    tag: {
      label: "System design",
      icon: "component",
    } satisfies KeyDecisionTag,
    title: "Key decisions",
    description:
      "How Elara separates business domains, structures services, verifies quality, and coordinates its platform.",
    decisions: [
      { label: "Domain boundaries", icon: "square-dashed" },
      { label: "Layered design", icon: "layers" },
      { label: "Verifiable quality", icon: "badge-check" },
      {
        label: "Centralized configuration",
        icon: "sliders-horizontal",
      },
    ] satisfies readonly DecisionContent[],
  },
  serviceStructure: {
    label: "INSIDE EVERY SERVICE",
    flowSummary:
      "A request enters the Controller, moves through the Service interface and implementation, then reaches the Repository or the global exception handler.",
    primary: [
      {
        label: "Controller",
        detail: "Request and response DTOs",
        tone: "edge",
      },
      {
        label: "Service",
        detail: "Interface and implementation",
        tone: "services",
      },
    ] satisfies readonly ServiceStationContent[],
    paths: [
      {
        label: "Repository",
        detail: "Entity and mapper",
        tone: "data",
      },
      {
        label: "Exceptions",
        detail: "Custom exceptions and one global handler",
        tone: "fault",
      },
    ] satisfies readonly ServiceStationContent[],
  },
  demo: {
    label: "RUN IT LOCALLY",
    description:
      "Start the Elara demo with Docker Compose and check its service logs in real time.",
    language: "bash",
    copyLabel: "Copy",
    copiedLabel: "Copied",
    commands: [
      [
        { text: "export", tone: "primary" },
        { text: " " },
        { text: "ELARA", tone: "edge" },
        { text: "=" },
        {
          text: '"oci://ghcr.io/elara-app/elara-demo:1.3.1"',
          tone: "services",
        },
      ],
      [
        { text: "sudo docker compose", tone: "primary" },
        { text: " -f " },
        { text: '"$ELARA"', tone: "services" },
        { text: " up -d --wait --wait-timeout 900" },
      ],
      [
        { text: "curl", tone: "primary" },
        { text: " -fsS " },
        {
          text: "http://127.0.0.1:8080/api/v1/inventory/item/7",
          tone: "services",
          breakBefore: true,
        },
      ],
      [
        { text: "sudo docker compose", tone: "primary" },
        { text: " -f " },
        { text: '"$ELARA"', tone: "services" },
        { text: " logs -f" },
      ],
    ] satisfies readonly (readonly CommandSegment[])[],
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
    ] satisfies readonly ResourceLinkContent[],
  },
} as const;
