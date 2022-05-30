import { AddressVariablesIcon, ApplyRepetitionIcon, BuildStatFourIcon, BuildStatOneIcon, BuildStatThreeIcon, BuildStatTwoIcon, EliminateExposuresIcon, EmbracePerspectivesIcon, HealStatFourIcon, HealStatOneIcon, HealStatThreeIcon, HealStatTwoIcon, ProjectOneIcon, ProjectThreeIcon, ProjectTwoIcon, RecognizeIdentitiesIcon, RedefineBoundariesIcon, RedistributeResourcesIcon, ReduceFailuresIcon, ReimagineHomesIcon, SupportStatFourIcon, SupportStatOneIcon, SupportStatThreeIcon, SupportStatTwoIcon } from "components/Icons";
import { grow } from "./projects/grow";
import { heal } from "./projects/heal";
import { support } from "./projects/support";

export const projects = [
  {
    id:401,
    data: grow,
    title: "Get Up & Grow",
    slug: "build",
    colour: "#118E5A",
    sub:"People Who Build",
    hero:"It's the people who build.",
    location:"Mexico City, Mexico",
    regionId:"MX",
    icon: ProjectOneIcon,
    body:"Get Up & Grow is an innovative social enterprise that matches agricultural migrants to local urban agriculture opportunities. We offer secure, dignified jobs to skilled newcomers and promote climate resilience and ecosystem diversity in urban areas. We leverage the agricultural skills of climate migrants to execute urban greening projects for private and community clients. ",
    stats:[
      {
        value: ["80","million"],
        icon: BuildStatOneIcon,
        text: "agriculture jobs lost globally."
      },
      {
        value: ["2", "million"],
        icon: BuildStatTwoIcon,
        text: "drop in labour participation."
      },
      {
        value: ["15%"],
        icon: BuildStatThreeIcon,
        text: "decline in income."
      },
      {
        value: "Pockets",
        value: [
          "Pockets",
          "of Poverty"
        ],
        icon: BuildStatFourIcon,
        text: "proliferated in urban outskirts."
      }
    ],
    principles:[
      {
        title: "recognize identities",
        icon: RecognizeIdentitiesIcon,
        body: "Leveraging the skills and experiences of displaced and non-displaced people alike to build climate-readiness."
      },
      {
        title: "apply repetition",
        icon: ApplyRepetitionIcon,
        body: "Curating systems that are flexible and scalable to respond to  both the needs of the community and of the ecosystem."
      },
      {
        title: "reduce failures",
        icon: ReduceFailuresIcon,
        body: "Utilizing green infrastructural interventions to ensure systemic robustness in case of industry failure."
      }
    ]
  },
  {
    id:402,
    data: heal,
    title: "CARE4U",
    slug: "heal",
    colour: "#F3624E",
    sub:"People Who Heal",
    hero:"It's the people who heal.",
    location:"Lytton, British Columbia, Canada",
    regionId:"CA",
    icon: ProjectTwoIcon,
    body:"CARE4U is an emerging program that introduces climate-informed therapy to help individuals manage eco-anxiety and recover from disaster-induced trauma before, during and after disasters. We offer immediate psychological first aid as well as long-term follow up by climate-aware therapists and volunteers to strengthen individual mental health resilience. We leverage reliable resources and information from existing organizations, such as Red Cross Canada, to equip people with knowledge and tools to prepare for recurrent disasters and build community resilience.",
    stats:[
      {
        value: [
          "1200",
          "residents"
        ],
        icon: HealStatOneIcon,
        text: "Evacuated from Lytton"
      },
      {
        value: [
          "17%"
        ],
        icon: HealStatTwoIcon,
        text: "Face mental health impacts."
      },
      {
        value: [
          "Post-Traumatic","Stress Disorder"
        ],
        icon: HealStatThreeIcon,
        text: "Diagnosed in children post-disaster"
      },
      {
        value: [
          "75%"
        ],
        icon: HealStatFourIcon,
        text: "Experience climate related anxiety nationally."
      }
    ],
    principles:[
      {
        title: "Embrace Perspectives",
        icon: EmbracePerspectivesIcon,
        body: "Constructing a service that allows for both individualized and community-driven approaches."
      },
      {
        title: "Redefine Boundaries",
        icon: RedefineBoundariesIcon,
        body: "Building a holistic framework that bridges the gap between disaster-induced trauma and climate anxiety for all."
      },
      {
        title: "Reimagine Home",
        icon: ReimagineHomesIcon,
        body: "Creating systems that will provide onsite immediate mental health first aid as well as long-term support."
      }
    ]
  },
  {
    id:403,
    data: support,
    title: "Remate",
    slug: "support",
    sub:"People Who Support",
    hero:"It's the people who support.",
    location:"Manila, Philippines",
    colour: "#403DFF",
    regionId:"PH",
    icon: ProjectThreeIcon,
    body:"Remate is a user experience layer embedded into trustworthy remittance services that incentivizes external migrants to reinvest in local climate resilience back home. We offer donation matching and rewards through our corporate partnerships to increase our market reach. We leverage the widespread market share of remittance users across the globe to create visibility for both emerging climate ventures and corporate social responsibility.",
    stats:[
      {
        value: [
          "$780","billion USD"
        ],
        icon: SupportStatOneIcon,
        text: "GDP value of global remittances."
      },
      {
        value: [
          "$10","billion USD"
        ],
        icon: SupportStatTwoIcon,
        text: "Lost nationally due to climate-related damages."
      },
      {
        value: [
          "8th"
        ],
        icon: SupportStatThreeIcon,
        text: "In the world for highest vulnerability."
      },
      {
        value: [
          "10%"
        ],
        icon: SupportStatFourIcon,
        text: "Of national GDP contributed by remittances."
      }
    ],
    principles:[
      {
        title: "eliminate exposures",
        icon: EliminateExposuresIcon,
        body: "Addressing needs for current migrants as well as vulnerable communities."
      },
      {
        title: "Address variables",
        icon: AddressVariablesIcon,
        body: "Ensuring that communities with varying levels of climate risk will be able to build resilience simultaneously."
      },
      {
        title: "redistribute Resources",
        icon: RedistributeResourcesIcon,
        body: "Creating transactional systems that will distribute resources on a local, corporate, and individual level across the globe."
      }
    ]
  }
]