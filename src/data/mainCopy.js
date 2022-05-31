import { AddressVariablesIcon, ApplyRepetitionIcon, EliminateExposuresIcon, RecognizeIdentitiesIcon, RedefineBoundariesIcon, RedistributeResourcesIcon, ReduceFailuresIcon, ReimagineHomesIcon } from "components/Icons";

const introTitle = () => {
  return (
    <span><span className="hover-def" data-def={0} data-hover>Climate change</span> affects everyone, everywhere.</span>
  )
}

const introSecOne = () => {
  return (
    <span>Temperature patterns have changed since the 19th century, and many species have perished as a result. With the endurance of this problem, more species of the planet will be impacted in more severe ways; including us, the humans.</span>
  )
}

const introSecTwo = () => {
  return (
    <span>The planet has been facing more frequent forms of natural disasters, transforming the homes of billions into unlivable spaces and leading to <span className="hover-def" data-def={1} data-hover>environmental migration.</span></span>
  )
}

const introSecThree = () => {
  return (
    <span>With the impending influx of people that major cities are going to experience, now, more than ever, we need to start redesigning our cities to be more climate-ready. Climate readiness is not just about creating infrastructure to fend off disasters but also learning to adapt for the fair and equitable inclusion of the incoming <span className="hover-def" data-def={2} data-hover>climate migrants</span> into our communities.</span>
  )
}

export const mainCopy = {
  introduction:{
    title:introTitle,
    body:[
      introSecOne, introSecTwo, introSecThree
    ]
  },
  map:[
    {
      helper:null,
      top:null,
      bottom:"Climate change's effects aren't immediately evident right away. Everything that happens around the world as a result of climate change has a direct or indirect impact on everyone in the ecosystem, including us humans.",
      postTitle:{
        text: "It’s the people",
        bold: "within our communities"
      },
      postBody:"For many individuals and groups, the only alternative is to relocate within the borders of the same country where they lived prior to the disaster. Migration trends from underdeveloped rural areas to well equipped metropolitan areas are a good example of this. The alternatives for migration are often limited due to a variety of circumstances ranging from a lack of money to ineligibility of credentials or lack of legal pathways."
    },
    {
      helper:"Hover over the map to learn more.",
      top:null,
      bottom:"Borders do not represent people; they represent land. People are moving across those borders for a variety of reasons and through the many routes open to them. However, the question is if there are any avenues available to people who are on the edge of losing their livelihood as a result of climate change, rather than only those who are seeking “refuge” after being visibly affected.",
      postTitle:{
        text: "It’s the people",
        bold: "that need to take risk"
      },
      postBody: `Staying at "home" is no longer an option when entire communities or countries are affected. People are displaced and relocated outside of their native country, putting them in a "refugee-like" situation, although they may not fit the criteria set forth in the 1950/51 refugee classifications.`
    },
    {
      helper:"Hover your cursor over the map to see where migrants are going.",
      top:null,
      bottom:'Throughout the year, millions of migrants are on the move. People who leave their homes and go to another country are sometimes disregarded due to the lack of legal avenues for recognition. The reason behind their move may be climate related projections in their home country, but the only legal pathway available to them may be "economical" and hence these numbers fail to reflect the true scale.',
      postTitle:{
        text: "",
        bold: ""
      },
      postBody: ""
    },
    {
      helper:"Hover your cursor over the map to find other projects.",
      top:null,
      bottom:"Projects are happening around the world",
      postTitle:{
        text: "",
        bold: ""
      },
      postBody: ""
    },
  ],
  principles:{
    preTitle:"Designing Climate-Ready Communities",
    preBody:[
      "Not everyone will be forcibly displaced by natural disasters, but the places where millions will seek refuge will need to adapt to their needs. Climate Readiness within communities means more than just resolving the difficulties of integration.",
      "Climate-ready communities understand that communities are systems that must be resilient, circular, co-operative, and integrated with the natural environment. Climate ready communities recognize that resiliency is embedded in the diversity of peoples, cultures, and ecosystems.",
      "A climate ready community acts in the present to produce future benefit for all, it reflects real world conditions rather than abstract utopias. How do we create climate-ready communities? We start by understanding the 9 core principles for building solutions."
    ],
    top:"How do we create climate-ready communities? We start by understanding the nine core principles for building solutions.",
    title:"9 Principles to lead the way",
    principles:[
      { 
        id:701,
        title:"Embrace Perspectives",
        body:"Climate migrants do not experience a single emotional trauma; some will undergo extreme mental distress associated with losing a home, while others will see migration as an opportunity for mobility, financial stability, or independence. We should strive to remain nonjudgmental in our perceptions of the migrant, and the migration experience.",
        icon: AddressVariablesIcon
      },
      { 
        id:702,
        title:"REDEFINE BOUNDARIES",
        body:"A migrant may experience multiple compounding factors, such as loss of livelihood or political instability and conflict, influencing their decision to migrate. The root cause, however, may be climate change. Climate migration is not currently acknowledged as a legal means to claim refugee status, despite the tendency for climate change to be an underlying factor in many people’s decision to relocate. ",
        icon: RedefineBoundariesIcon
      },
      { 
        id:703,
        title:"REDISTRIBUTE RESOURCES",
        body:"Emerging economies have less financial resources to adapt, despite greater exposure to climate change. This exposure might be due to geographic location and/or their industries’ or economy’s reliance on the health of their natural environment, for example, tourism. The dominant economic engines that contribute the most to climate change, such as Canadian oil companies, must change course and provide the means for smaller economies to protect themselves. Degrading environmental conditions do not ascribe to political boundaries, therefore national economies should address climate change at a global scale.",
        icon: RedistributeResourcesIcon
      },
      { 
        id:704,
        title:"APPLY REPETITION",
        body:"As seen in natural systems, there are benefits to redundancy, or many species in an ecosystem providing the same or similar function. Should one species be negatively affected by a change in the environment and unable to perform its role, there will be others to continue to support the ecosystem. More biodiverse spaces will help mitigate the effects of climate change, including economic disruptions and climate migration. ",
        icon: ApplyRepetitionIcon
      },
      { 
        id:705,
        title:"ELIMINATE EXPOSURES",
        body:"Although climate migrants need and deserve paths to resettlement that uphold their dignity, we must not overlook individuals within those communities that might already be experiencing housing insecurity and exposure to climate risks. Climate-ready Communities understand that all current and future community members require equitable design solutions.",
        icon: EliminateExposuresIcon
      },
      { 
        id:706,
        title:"RECOGNIZE IDENTITIES",
        body:"Human resettlement will require us to embrace change within our communities and  the value that people create, for one another and the local environment. A rise in migration means we will see increasingly diverse populations. This diversity will benefit communities socially, economically, and environmentally by contributing an array of cultural experiences, skills, and resources that better positions communities to respond and adapt to climate change.",
        icon: RecognizeIdentitiesIcon
      },
      { 
        id:707,
        title:"ADDRESS VARIABLES",
        body:"Communities at the forefront of climate change are vulnerable in different ways. Some are preparing for the direct physical effects of extreme weather. Others that will host climate migrants will need to prepare for the effects of population growth and increased human activity. Our framework of preparedness must reflect the assorted risks communities may face as a result of climate change.",
        icon: AddressVariablesIcon
      },
      { 
        id:708,
        title:"REDUCE FAILURES",
        body:"We can apply this same principle of redundancy at a community infrastructure level. By creating functional diversity in a community, you protect against total systems failure. Should one service, such as a power generator, go offline during a moment of extreme weather, others may step in to  support the community until the interruption has been resolved. This should be applied to all components of a community, including the built environment, landscapes, institutions, cultural groups and knowledge systems.",
        icon: ReduceFailuresIcon
      },
      { 
        id:709,
        title:"REIMAGINE HOMES",
        body:"The process of relocation the migrant undergoes is difficult to segment into a linear journey of ‘before, during, and after.’ Migration is a continuous process that does not conclude once the migrant has reached a landing point, but persists as they adapt and integrate into a new community. Home is not a fixed, physical location. It is where one decides to stay for however long they decide to stay there.",
        icon: ReimagineHomesIcon
      }
    ]
  },
  projectsIntro:{
    title: "Climate-Ready Communities will be people-centred",
    body: "We’ve developed three solutions to be used as frameworks for designing people-centered solutions. Each of these projects use the nine principles to address the various pain points in achieving climate-readiness."
  },
  otherProjectsIntro:{
    title: "Projects are happening around the world",
    body: "People were migrating before there were any defined borders, and they continue to do so through the legal avenues available to them; nevertheless, what would happen if climate change accelerates this migration? What will happen to the cultural identities and livelihoods that have been established? Here are some examples of initiatives taking on around the world that may help to establish communities capable of accommodating the influx and contribute to building climate-ready communities."
  },
  footer: {
    title:"THANK YOU",
    body:[
      "This research project could not have been completed without the help and facilitation of the faculty at George Brown College and the Institute Without Boundaries. Special mention to our Major Project Faculty, Graeme Kondruss, John Jung, Matthew Hexemer, Eirene Keh, Nazanin Homayounfar, and Robert Giusti.",
      "We would also like to thank the our subject matter experts for their time and contributions to our research, the various volunteers from Politecnico di Milano, École de Communication Visuelle, University of Nairobi, and the students at George Brown College."
    ]
  }
}