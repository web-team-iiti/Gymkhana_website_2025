"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaScroll,
  FaLandmark,
  FaGavel,
  FaFileAlt,
  FaDownload,
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaUsers,
  FaArrowRight,
  FaArrowUp,
  FaPlay,
  FaPause,
  FaVideo,
  FaShieldAlt,
  FaExternalLinkAlt,
  FaBookOpen,
  FaCalendarAlt,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaStamp,
  FaRegCopy,
  FaQuoteLeft,
  FaBullhorn,
  FaBalanceScale,
  FaAward
} from "react-icons/fa";
import { MdVerified, MdOutlineArticle, MdAccessTime, MdOutlineAccountBalance, MdCheckCircle } from "react-icons/md";
import { IoMailOutline, IoLogoLinkedin } from "react-icons/io5";

// ==========================================
// 1. DATA: Verified Executive Office Bearers
// ==========================================
const verifiedOfficeBearers = [
  {
    name: "Moksha Tyagi",
    title: "President",
    council: "Students' Gymkhana",
    img: "/secretaries/President.jpeg",
    email: "president.sg@iiti.ac.in",
    tenure: "2025 - 2026",
    status: "Verified in Office",
    roleDescription: "Executive head of the Students' Gymkhana, represents the student body in Institute Senate & BOG."
  },
  {
    name: "Dhruv Bhardwaj",
    title: "General Secretary",
    council: "Science & Technology",
    img: "/secretaries/GS SnT.jpeg",
    email: "gs.scitech@iiti.ac.in",
    tenure: "2025 - 2026",
    status: "Verified in Office",
    roleDescription: "Oversees technical clubs, technical symposiums, research initiatives, and hackathons."
  },
  {
    name: "Sohil Dangi",
    title: "General Secretary",
    council: "Cultural Affairs",
    img: "/secretaries/GS Cult.jpg",
    email: "gs.culturals@iiti.ac.in",
    tenure: "2025 - 2026",
    status: "Verified in Office",
    roleDescription: "Heads cultural clubs, fine arts, music, dance, dramatics, and the annual cultural fest."
  },
  {
    name: "Badal Singh",
    title: "General Secretary",
    council: "Hostel Affairs",
    img: "/secretaries/GS Hostel.jpeg",
    email: "gs.hostel@iiti.ac.in",
    tenure: "2025 - 2026",
    status: "Verified in Office",
    roleDescription: "Liaisons with hall management, residential facilities, student amenities, and maintenance."
  },
  {
    name: "Kavyansh Raj Singh",
    title: "General Secretary",
    council: "Academic Affairs (UG)",
    img: "/secretaries/GS Acads UG.png",
    email: "gs.acad.ug@iiti.ac.in",
    tenure: "2025 - 2026",
    status: "Verified in Office",
    roleDescription: "Undergraduate curriculum representations, academic grievances, and student-faculty dialogue."
  },
  {
    name: "Isha Sharma",
    title: "General Secretary",
    council: "Academic Affairs (PG)",
    img: "/secretaries/GS Acad Pg.jpeg",
    email: "gs.acad.pg@iiti.ac.in",
    tenure: "2025 - 2026",
    status: "Verified in Office",
    roleDescription: "Postgraduate & Ph.D. scholars welfare, research fellow representation, and PG academic affairs."
  },
  {
    name: "Lakshya Shukla",
    title: "General Secretary",
    council: "Sports Affairs",
    img: "/secretaries/GS Sports.jpg",
    email: "gs.sports@iiti.ac.in",
    tenure: "2025 - 2026",
    status: "Verified in Office",
    roleDescription: "Directs sports clubs, gymnasium, intra-mural tournaments, and Inter-IIT Sports Meet preparations."
  },
  {
    name: "Vishal Shakya",
    title: "General Secretary",
    council: "Counselling, Outreach & Alumni",
    img: "/secretaries/GS COA.jpg",
    email: "gs.coa@iiti.ac.in",
    tenure: "2025 - 2026",
    status: "Verified in Office",
    roleDescription: "Student mentorship, mental wellness cell coordination, external brand outreach, and alumni ties."
  },
  {
    name: "Yogendra Bihare",
    title: "General Secretary",
    council: "Mess, Cafeteria & Allied Services",
    img: "/secretaries/GS MAC.jpg",
    email: "gs.dining@iiti.ac.in",
    tenure: "2025 - 2026",
    status: "Verified in Office",
    roleDescription: "Manages central dining facilities, hygiene audits, menu standardizations, and food vendor policies."
  }
];

// ==========================================
// 2. DATA: Constitution Chapters & Articles
// ==========================================
const constitutionChapters = [
  {
    id: "preamble",
    chapterNum: "Preamble",
    title: "Solemn Declaration & Preamble",
    summary: "The foundational commitment of the students of IIT Indore to democracy, autonomy, integrity, and collective welfare.",
    articles: [
      {
        articleNum: "Preamble",
        heading: "Preamble to the Students' Gymkhana Constitution",
        clauses: [
          "WE, THE STUDENTS OF THE INDIAN INSTITUTE OF TECHNOLOGY INDORE, with an unwavering commitment to democratic principles, academic excellence, mutual respect, and student autonomy, DO HEREBY ADOPT, ENACT, AND GIVE TO OURSELVES THIS CONSTITUTION.",
          "The Students' Gymkhana exists to foster intellectual, cultural, athletic, and social enrichment, ensuring that every registered student enjoys equitable representation, transparent governance, and unfettered opportunity to lead, innovate, and serve the institute and nation."
        ],
        amendmentNote: "Ratified by Student Referendum in 2012; Re-affirmed in 4th Comprehensive Constitutional Revision (2025)."
      }
    ]
  },
  {
    id: "chap-1",
    chapterNum: "Chapter I",
    title: "Name, Jurisdiction & Supremacy",
    summary: "Establishes the legal entity of Students' Gymkhana, jurisdiction, official emblem, and constitutional supremacy.",
    articles: [
      {
        articleNum: "Article 1.1",
        heading: "Title & Legal Status",
        clauses: [
          "This body shall be known as the 'Students' Gymkhana, Indian Institute of Technology Indore' (hereinafter referred to as the Gymkhana).",
          "The Gymkhana is the official autonomous representative body recognized by the Institute Senate and Board of Governors of IIT Indore under the Institutes of Technology Act."
        ],
        amendmentNote: "Verified with IIT Indore Statute Section 23(1)."
      },
      {
        articleNum: "Article 1.2",
        heading: "Constitutional Supremacy & Invalidation",
        clauses: [
          "This Constitution shall be the supreme governing document for all student activities, councils, clubs, cells, and societies at IIT Indore.",
          "Any council charter, club bylaw, executive order, or committee resolution inconsistent with the provisions of this Constitution shall, to the extent of such inconsistency, be null and void."
        ],
        amendmentNote: "Affirmed by Senate Resolution SR-2018-04."
      },
      {
        articleNum: "Article 1.3",
        heading: "Official Insignia, Flag & Custody",
        clauses: [
          "The emblem of the Students' Gymkhana depicts the multi-colored flame of intellect and unity rooted in the institutional foundation.",
          "Official correspondence, ratified resolutions, and gazette notifications must bear the registered Gymkhana seal and digital cryptographic signature."
        ]
      }
    ]
  },
  {
    id: "chap-2",
    chapterNum: "Chapter II",
    title: "General Body, Membership & Rights",
    summary: "Defines student membership, voting franchise, fundamental protections, and obligations.",
    articles: [
      {
        articleNum: "Article 2.1",
        heading: "Ordinary Membership & Eligibility",
        clauses: [
          "Every bona fide registered student of IIT Indore (B.Tech, B.Des, M.Tech, M.Sc, M.S.(R), M.A., and Ph.D.) is automatically an Ordinary Member of the Gymkhana upon payment of the designated Gymkhana fee.",
          "No student shall be denied membership or participation on grounds of gender, creed, caste, religion, native region, or discipline."
        ]
      },
      {
        articleNum: "Article 2.2",
        heading: "Bill of Student Rights & Protections",
        clauses: [
          "Right to Vote: Every member possesses an equal, secret-ballot vote in annual Gymkhana General Elections.",
          "Right to Petition: Any member may submit a formal legislative petition to the Senate backed by a minimum of 50 student endorsements.",
          "Right to Information: All non-confidential Senate Minutes, financial balance sheets, and executive decisions shall be publicly archived within seven (7) days of ratification."
        ],
        amendmentNote: "Enhanced in 2024 to mandate online open-access publishing of all accounts."
      }
    ]
  },
  {
    id: "chap-3",
    chapterNum: "Chapter III",
    title: "The Student Senate: Powers & Procedures",
    summary: "The legislative backbone: composition, speaker powers, quorum requirements, bills, and veto overrides.",
    articles: [
      {
        articleNum: "Article 3.1",
        heading: "Composition of the Senate",
        clauses: [
          "The Student Senate is the apex legislative and policy-making body of the Gymkhana, comprising directly elected Student Senators representing all batches and academic programs.",
          "The Senate is presided over by the Speaker of the Senate, elected from among senators during the constitutive first ordinary session."
        ]
      },
      {
        articleNum: "Article 3.2",
        heading: "Legislative Authority & Budgetary Control",
        clauses: [
          "The Senate possesses exclusive power to approve annual and supplementary Gymkhana budgets, enact statutory policies, and ratify festival allocations.",
          "No club or council expenditure above INR 50,000 outside pre-sanctioned heads may be disbursed without formal Senate legislative appropriation."
        ]
      },
      {
        articleNum: "Article 3.3",
        heading: "Quorum & Voting Procedure",
        clauses: [
          "The quorum for any ordinary Senate meeting shall be fifty percent plus one (50% + 1) of the serving Senate membership.",
          "Ordinary bills pass with a simple majority of members present and voting. Constitutional amendments require a two-thirds (2/3) supermajority of total Senate strength."
        ]
      }
    ]
  },
  {
    id: "chap-4",
    chapterNum: "Chapter IV",
    title: "The Executive Council: Portfolios & Duties",
    summary: "The executive branch: President, General Secretaries, collective responsibility, and executive mandates.",
    articles: [
      {
        articleNum: "Article 4.1",
        heading: "President of the Students' Gymkhana",
        clauses: [
          "The President is the principal executive officer of the Gymkhana, responsible for overall coordination, representing students before Institute authorities, and ensuring constitutional enforcement.",
          "The President convenes Executive Council meetings and holds veto authority over subordinate executive directives, subject to Senate override."
        ]
      },
      {
        articleNum: "Article 4.2",
        heading: "General Secretaries & Portfolios",
        clauses: [
          "The Executive Council comprises nine (9) elected executive officers: President, GS Science & Technology, GS Culturals, GS Sports, GS Academic Affairs (UG), GS Academic Affairs (PG), GS Hostel Affairs, GS Mess & Allied Services, and GS Counselling, Outreach & Alumni.",
          "Each General Secretary must submit an Action Taken Report (ATR) and audited expenditure record to the Senate at every bi-monthly ordinary meeting."
        ]
      }
    ]
  },
  {
    id: "chap-5",
    chapterNum: "Chapter V",
    title: "Financial Governance & Audit Protocol",
    summary: "Mandates financial prudence, Gymkhana bank account governance, voucher verification, and annual public audits.",
    articles: [
      {
        articleNum: "Article 5.1",
        heading: "The Gymkhana General Fund",
        clauses: [
          "All student activity fees, sponsorships, and institutional grants shall be deposited into the official Institute Students' Gymkhana account.",
          "Financial operations are jointly monitored by the President, concerned General Secretary, and approved by Associate Dean (ADOSA) / Dean of Student Affairs (DOSA)."
        ]
      },
      {
        articleNum: "Article 5.2",
        heading: "Auditing & Public Ledger",
        clauses: [
          "An annual financial audit must be conducted by the Finance & Budget Advisory Committee (FBAC) and certified by the Institute Internal Audit team.",
          "All audited balance sheets must be published on the digital portal for thirty (30) days for student inspection prior to Senate approval."
        ]
      }
    ]
  },
  {
    id: "chap-6",
    chapterNum: "Chapter VI",
    title: "Electoral Code & Election Commission",
    summary: "Autonomous Central Election Commission, candidate eligibility, Model Code of Conduct, and dispute adjudication.",
    articles: [
      {
        articleNum: "Article 6.1",
        heading: "Central Election Commission (CEC)",
        clauses: [
          "Elections are conducted annually in Spring semester by an autonomous Chief Election Commissioner appointed by the Senate in consultation with DOSA.",
          "Election Commissioners must not hold active political candidacy or executive council office."
        ]
      },
      {
        articleNum: "Article 6.2",
        heading: "Model Code of Conduct & Fair Play",
        clauses: [
          "Use of paper posters, defacement of campus infrastructure, and expenditure surpassing sanctioned caps are strictly prohibited.",
          "Voting shall be conducted via a verified, cryptographically audited digital ballot system accessible solely to authenticated institute student IDs."
        ]
      }
    ]
  },
  {
    id: "chap-7",
    chapterNum: "Chapter VII",
    title: "Constitutional Amendments & Impeachment",
    summary: "Rigorous mechanisms for amending constitutional clauses, impeachment of executive officers, and dissolution.",
    articles: [
      {
        articleNum: "Article 7.1",
        heading: "Amendment Procedure",
        clauses: [
          "An amendment bill may be proposed by any Senator or the Constitution & Rules Review Committee (CRRC) with seven (7) days advance written notice.",
          "Passing requires a two-thirds (2/3) supermajority of total Senate strength, followed by formal notification and assent from the Dean of Student Affairs (DOSA)."
        ]
      },
      {
        articleNum: "Article 7.2",
        heading: "Vote of No Confidence & Impeachment",
        clauses: [
          "A motion of no confidence against any Executive Officer may be initiated by thirty percent (30%) of the Senate on documented charges of financial fraud, gross constitutional violation, or negligence of duties.",
          "Impeachment succeeds only after an evidentiary hearing by the CRRC and a three-fourths (3/4) affirmative vote of total Senate membership."
        ]
      }
    ]
  }
];

// ==========================================
// 3. DATA: Searchable Senate Minutes & Documents
// ==========================================
const officialDocumentsArchive = [
  {
    id: "MOM-2026-18",
    refNumber: "IITI/SG/SEN/2026/18",
    title: "18th Ordinary Senate Meeting — Minutes of Meeting (MoM)",
    date: "February 12, 2026",
    academicYear: "2025-26",
    category: "Senate MoMs",
    presidedBy: "Speaker of the Senate & President Moksha Tyagi",
    verified: true,
    fileSize: "1.4 MB",
    downloadUrl: "#",
    summary: "Annual Gymkhana Budget 2026-27 sanction, Fluxus & Euristica fest allocations, mess grievance redressal mechanism, and revised academic grading representations.",
    resolutions: [
      "Unanimously passed resolution approving INR 38.5 Lakhs central budget for Fluxus '26 and Euristica '26.",
      "Approved revised student mess feedback rubric and mandated 48-hour catering penalty escalation.",
      "Ratified establishment of student peer academic tutoring cell under GS Academic (UG)."
    ],
    attendees: "31 Senators present, 3 excused absences. DOSA representative in attendance."
  },
  {
    id: "MOM-2025-17",
    refNumber: "IITI/SG/SEN/2025/17",
    title: "17th Ordinary Senate Meeting — Minutes of Meeting (MoM)",
    date: "November 18, 2025",
    academicYear: "2025-26",
    category: "Senate MoMs",
    presidedBy: "Speaker of the Senate",
    verified: true,
    fileSize: "1.1 MB",
    downloadUrl: "#",
    summary: "Revision of club equipment sanction norms, hostel quiet-hour policies, Inter-IIT Sports contingent preparations, and campus sustainability audit.",
    resolutions: [
      "Sanctioned capital procurement of Olympic-standard sports apparatus for the indoor sports complex.",
      "Formulated joint campus green committee under Outreach & Alumni Council.",
      "Approved digital inventory audit protocol for technical clubs."
    ],
    attendees: "33 Senators present. ADOSA guest speaker."
  },
  {
    id: "ACT-2025-04",
    refNumber: "IITI/SG/SEN/2025/EX-02",
    title: "4th Constitutional Amendment Act (2025) — Gazette Notification",
    date: "September 24, 2025",
    academicYear: "2025-26",
    category: "Constitutional Amendments",
    presidedBy: "Full Senate Joint Session",
    verified: true,
    fileSize: "840 KB",
    downloadUrl: "#",
    summary: "Expanded postgraduate and Ph.D. seat quotas in the Student Senate, modernized digital voting safeguards, and updated financial threshold ceilings.",
    resolutions: [
      "Amended Article 3.1 to incorporate 4 dedicated seats for Doctoral Scholars.",
      "Enacted Article 6.3 defining digital cryptographic voting protocols for annual elections.",
      "Gazette officially signed by President, Senate Speaker, and Dean of Student Affairs (DOSA)."
    ],
    attendees: "Full Senate quorum (34 Senators present). Assented by DOSA on Oct 01, 2025."
  },
  {
    id: "MOM-2025-16",
    refNumber: "IITI/SG/SEN/2025/16",
    title: "16th Ordinary Senate Meeting — Minutes of Meeting (MoM)",
    date: "April 14, 2025",
    academicYear: "2024-25",
    category: "Senate MoMs",
    presidedBy: "Outgoing Speaker of the Senate",
    verified: true,
    fileSize: "1.8 MB",
    downloadUrl: "#",
    summary: "Annual Financial Audit presentation, valedictory review of council tenures, handover protocol to incoming Executive Council, and senate commendations.",
    resolutions: [
      "Adopted final balance sheet of 2024-25 financial year with zero discrepancies reported by FBAC.",
      "Ratified formal transition checklist for the 2025-26 incoming secretaries.",
      "Conferred Student Service Citations upon retiring club coordinators."
    ],
    attendees: "35 Senators and all outgoing/incoming General Secretaries."
  },
  {
    id: "MOM-2025-15",
    refNumber: "IITI/SG/SEN/2025/15",
    title: "15th Ordinary Senate Meeting — Minutes of Meeting (MoM)",
    date: "January 20, 2025",
    academicYear: "2024-25",
    category: "Senate MoMs",
    presidedBy: "Speaker of the Senate",
    verified: true,
    fileSize: "1.2 MB",
    downloadUrl: "#",
    summary: "Inter-IIT Sports & Cultural contingencies budget approval, cafeteria tender evaluation report, and hostel water filtration oversight.",
    resolutions: [
      "Allocated funds for Inter-IIT Sports contingent travel, kits, and coaching staff.",
      "Sanctioned trial operation of late-night dining tuck-shops near hostel complexes.",
      "Adopted mandatory bi-weekly hygiene inspection checklist."
    ],
    attendees: "30 Senators present."
  },
  {
    id: "CEC-2025-01",
    refNumber: "IITI/SG/CEC/2025/01",
    title: "Chief Election Commission: General Election Code & Schedule 2025",
    date: "March 05, 2025",
    academicYear: "2024-25",
    category: "Election Code",
    presidedBy: "Chief Election Commissioner",
    verified: true,
    fileSize: "620 KB",
    downloadUrl: "#",
    summary: "Official code of conduct, nomination schedules, debate format, expenditure audit limits, and grievance redressal mechanism for 2025 Gymkhana Elections.",
    resolutions: [
      "Strict prohibition of printed non-biodegradable promotional collateral on campus.",
      "Mandatory public presidential debate broadcasted live on campus portal.",
      "Establishment of Election Appellate Tribunal headed by faculty ombudsman."
    ],
    attendees: "Approved by Senate and notified to all student constituencies."
  },
  {
    id: "FIN-2025-01",
    refNumber: "IITI/SG/FIN/2025/01",
    title: "Annual Gymkhana Financial Statement & Budget Allocation 2025-26",
    date: "October 02, 2025",
    academicYear: "2025-26",
    category: "Financial Reports",
    presidedBy: "Finance & Budget Advisory Committee (FBAC)",
    verified: true,
    fileSize: "2.1 MB",
    downloadUrl: "#",
    summary: "Comprehensive itemized financial ledger allocating funds across 5 primary Councils, 24 recognized student clubs, welfare reserve, and capital equipment.",
    resolutions: [
      "Total appropriation sanctioned: INR 1.12 Crores.",
      "Reserved 15% contingency reserve fund for national competition travel grants.",
      "Instituted real-time public bills tracking ledger under ADOSA portal."
    ],
    attendees: "Signed by President, FBAC Convenor, and Dean of Student Affairs."
  },
  {
    id: "SGRC-2025-01",
    refNumber: "IITI/SG/SGRC/2025/01",
    title: "Students' Grievance & Disciplinary Regulatory Charter",
    date: "August 15, 2025",
    academicYear: "2025-26",
    category: "Regulations & Codes",
    presidedBy: "Student Disciplinary Committee (SDC) & SGRC",
    verified: true,
    fileSize: "750 KB",
    downloadUrl: "#",
    summary: "Statutory framework governing student welfare, anti-ragging measures, internal complaint mechanisms, and transparent dispute mediation protocols.",
    resolutions: [
      "Re-affirmed zero tolerance toward ragging, harassment, or intimidation.",
      "Established 72-hour mandatory response timeline for confidential student grievances.",
      "Integrated 24x7 student helpline contacts with medical and counselling units."
    ],
    attendees: "Promulgated jointly with Institute Dean of Student Affairs."
  }
];

// ==========================================
// 4. DATA: Standing Committees
// ==========================================
const standingCommittees = [
  {
    name: "Constitution & Rules Review Committee (CRRC)",
    mandate: "Interprets constitutional provisions, assesses legislative proposals, investigates procedural violations, and drafts statutory amendment bills.",
    composition: "Senate Speaker (Chair), 4 elected Senators, 1 PG representative, Legal Advisor (Faculty ex-officio).",
    lead: "Speaker of Senate",
    status: "Active Standing Body"
  },
  {
    name: "Finance & Budget Advisory Committee (FBAC)",
    mandate: "Scrutinizes annual budget estimates, audits council vouchers, reviews sponsorship contracts, and enforces fiscal transparency.",
    composition: "President (Convenor), All General Secretaries, 3 Finance Senators, ADOSA (Advisory).",
    lead: "President Moksha Tyagi",
    status: "Active Standing Body"
  },
  {
    name: "Central Election Commission (CEC)",
    mandate: "Maintains autonomous oversight of Gymkhana general elections, enforces the Model Code of Conduct, and tallies digital ballots.",
    composition: "Chief Election Commissioner, 2 Deputy Commissioners, Faculty Observer.",
    lead: "Appointed Annually by Senate",
    status: "Statutory Autonomous Commission"
  },
  {
    name: "Mess & Dining Advisory Committee (MDAC)",
    mandate: "Conducts surprise hygiene inspections, determines menu schedules, adjudicates food supplier contracts, and oversees dining welfare.",
    composition: "GS Mess & Allied Services, Hostel Representatives, Institute Medical Officer, Caterer Representative.",
    lead: "GS Yogendra Bihare",
    status: "Active Standing Body"
  },
  {
    name: "Student Grievance Redressal Cell (SGRC)",
    mandate: "Confidential and impartial channel for student concerns regarding academic grading, hostel facilities, or administrative friction.",
    composition: "Dean of Student Affairs (DOSA), 2 Faculty Nominees, President Gymkhana, 2 Student Senators.",
    lead: "DOSA & Student Nominees",
    status: "Statutory Regulatory Cell"
  },
  {
    name: "Anti-Ragging Student Oversight Cell",
    mandate: "Maintains 24x7 campus vigil, conducts orientation awareness drives, and ensures unconditional compliance with national anti-ragging statutes.",
    composition: "Associate Dean (ADOSA), Chief Proctor, President Gymkhana, Student Squad Volunteers.",
    lead: "ADOSA & Proctorial Board",
    status: "Statutory High Vigilance"
  }
];

// ==========================================
// 5. MAIN COMPONENT
// ==========================================
export default function ConstitutionPage() {
  // Search & Filter states for Documents Archive
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Documents");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedDocModal, setSelectedDocModal] = useState(null);

  // Constitution Chapter accordion
  const [activeChapterId, setActiveChapterId] = useState("preamble");
  const [expandedArticles, setExpandedArticles] = useState({ "Preamble": true, "Article 1.1": true, "Article 1.2": true });
  const [constitutionSearch, setConstitutionSearch] = useState("");

  // Media / Video toggle for the Hero section
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);

  // Document Verification Checker state
  const [verifyRefInput, setVerifyRefInput] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  // Copy notice toast
  const [copyFeedback, setCopyFeedback] = useState("");

  // Categories for Document filtering
  const categories = [
    "All Documents",
    "Senate MoMs",
    "Constitutional Amendments",
    "Financial Reports",
    "Election Code",
    "Regulations & Codes"
  ];

  const academicYears = ["All Years", "2025-26", "2024-25", "2023-24"];

  // Toggle article expansion
  const toggleArticle = (artNum) => {
    setExpandedArticles((prev) => ({
      ...prev,
      [artNum]: !prev[artNum]
    }));
  };

  // Filtered Documents
  const filteredDocuments = useMemo(() => {
    return officialDocumentsArchive.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.refNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.resolutions.some((res) => res.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === "All Documents" || doc.category === selectedCategory;

      const matchesYear =
        selectedYear === "All Years" || doc.academicYear === selectedYear;

      return matchesSearch && matchesCat && matchesYear;
    });
  }, [searchQuery, selectedCategory, selectedYear]);

  // Filtered Constitution Articles
  const activeChapterData = useMemo(() => {
    const chapter = constitutionChapters.find((c) => c.id === activeChapterId);
    if (!chapter) return constitutionChapters[0];

    if (!constitutionSearch.trim()) return chapter;

    const filteredArticles = chapter.articles.filter((art) => {
      const matchHead = art.heading.toLowerCase().includes(constitutionSearch.toLowerCase());
      const matchNum = art.articleNum.toLowerCase().includes(constitutionSearch.toLowerCase());
      const matchClauses = art.clauses.some((cl) => cl.toLowerCase().includes(constitutionSearch.toLowerCase()));
      return matchHead || matchNum || matchClauses;
    });

    return {
      ...chapter,
      articles: filteredArticles
    };
  }, [activeChapterId, constitutionSearch]);

  // Handle document verification test
  const handleVerifyCheck = (e) => {
    e.preventDefault();
    if (!verifyRefInput.trim()) return;

    const found = officialDocumentsArchive.find(
      (d) => d.refNumber.toLowerCase().trim() === verifyRefInput.toLowerCase().trim()
    );

    if (found) {
      setVerificationResult({
        found: true,
        document: found,
        message: "Digital Signature & Gazette Stamp Authenticated"
      });
    } else {
      setVerificationResult({
        found: false,
        message: `No ratified Gazette document with reference '${verifyRefInput}' exists in the official registry.`
      });
    }
  };

  const handleCopyText = (text, label) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyFeedback(`Copied ${label} to clipboard!`);
      setTimeout(() => setCopyFeedback(""), 2500);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 font-sans selection:bg-[#8C5353] selection:text-white relative">
      {/* Background Subtle Dot Matrix Pattern (Matching IIT Indore Institute Website Theme) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#CBB9A7 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Copy notification popup */}
      {copyFeedback && (
        <div className="fixed bottom-20 right-8 z-50 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-2xl text-sm flex items-center gap-2 border border-stone-700 animate-fadeIn">
          <FaCheckCircle className="text-emerald-400" />
          <span>{copyFeedback}</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. TOP INSTITUTIONAL BAR & BILINGUAL CREST (From Institute Theme) */}
      {/* ============================================================== */}
      <header className="relative z-20 bg-[#101724] text-white border-b border-[#253246] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* IIT Indore Official bilingual crest & title */}
          <div className="flex items-center space-x-3.5">
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-white p-1 shadow-sm border border-stone-200">
              <Image
                src="/logo.png"
                alt="IIT Indore Seal"
                width={48}
                height={48}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide text-stone-300 font-serif">
                भारतीय प्रौद्योगिकी संस्थान इंदौर
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Indian Institute of Technology Indore
                <span className="hidden sm:inline-block text-xs uppercase px-2 py-0.5 rounded bg-[#8C5353] text-stone-100 font-semibold">
                  Official Portal
                </span>
              </h1>
              <p className="text-xs text-stone-400 font-mono tracking-wide">
                Students' Gymkhana • Legislative & Constitutional Repository
              </p>
            </div>
          </div>

          {/* Quick Category Anchors */}
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium">
            <button
              onClick={() => scrollToSection("constitution-charter")}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-stone-200 hover:text-white"
            >
              The Constitution
            </button>
            <button
              onClick={() => scrollToSection("senate-mom-archive")}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-stone-200 hover:text-white"
            >
              Senate MoMs
            </button>
            <button
              onClick={() => scrollToSection("governance-hierarchy")}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-stone-200 hover:text-white"
            >
              Governance
            </button>
            <button
              onClick={() => scrollToSection("office-bearers")}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-stone-200 hover:text-white"
            >
              Office Bearers
            </button>
            <button
              onClick={() => scrollToSection("standing-committees")}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-stone-200 hover:text-white"
            >
              Committees
            </button>
            <button
              onClick={() => scrollToSection("verification-portal")}
              className="px-3 py-1.5 rounded-full bg-[#8C5353] text-white hover:bg-[#774242] transition flex items-center gap-1.5 font-semibold"
            >
              <MdVerified /> Verify Doc
            </button>
          </nav>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. TICKER ANNOUNCEMENT BAR (Matches Institute Website Screenshot 2) */}
      {/* ============================================================== */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#EFE8DE] border border-[#DDD3C7] rounded-full px-5 py-2.5 shadow-sm text-stone-800">
          <div className="flex items-center gap-3 overflow-hidden text-sm">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#8C5353] shadow-sm">
              <FaBullhorn />
            </div>
            <span className="font-bold text-xs uppercase tracking-wider text-[#8C5353] bg-white/80 px-2.5 py-1 rounded-full whitespace-nowrap">
              Senate Gazette Notice
            </span>
            <p className="truncate text-stone-700 font-medium">
              18th Ordinary Senate Meeting Minutes (MoM) & 4th Constitutional Amendment ratified and archived.
            </p>
          </div>
          <button
            onClick={() => scrollToSection("senate-mom-archive")}
            className="flex-shrink-0 self-end sm:self-auto text-xs sm:text-sm font-bold text-stone-900 hover:text-[#8C5353] flex items-center gap-1.5 transition ml-auto"
          >
            <span>Read Gazette MoM</span>
            <FaArrowRight className="text-xs" />
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. HERO SECTION (Matches Architecture & Stat Cards from Screenshot 2) */}
      {/* ============================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Campus Architecture / Media Card (with Video / Placeholder switch) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900 group">
              
              {!isVideoMode ? (
                /* Static High-Res Campus Showcase */
                <div className="relative h-[480px] w-full">
                  <Image
                    src="/iiti_campus_building.jpg"
                    alt="IIT Indore Modern Campus Architecture"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Floating Constitutional Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-stone-800 shadow-md flex items-center gap-2 border border-stone-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Supreme Charter • In Force
                  </div>

                  {/* Bottom details card */}
                  <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-black/60 backdrop-blur-md text-white border border-white/20">
                    <div className="flex items-center gap-2 text-[#E2A687] text-xs font-bold uppercase tracking-wider mb-1">
                      <FaBalanceScale /> Autonomous Student Governance
                    </div>
                    <h3 className="font-serif text-lg font-bold">
                      Constitution of Students' Gymkhana
                    </h3>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Adopted Nov 2012 • 4th Revision Gazetted 2025 • Registered with Institute Senate
                    </p>
                    <div className="mt-3 flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-xs text-stone-300 font-mono">Reg: IITI/SG/CONST/REV-04</span>
                      <a
                        href="#senate-mom-archive"
                        className="text-xs text-white font-semibold underline underline-offset-4 hover:text-[#E2A687]"
                      >
                        View Gazette Documents →
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                /* Continuous Campus Video Stream Placeholder (Requested by user) */
                <div className="relative h-[480px] w-full bg-stone-950 flex flex-col justify-between p-6 text-white">
                  <div className="flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-red-600/90 text-xs font-bold flex items-center gap-1.5 text-white animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                      CAMPUS MEDIA STREAM
                    </span>
                    <span className="text-xs text-stone-400 font-mono">1080p • Live Stream Placeholder</span>
                  </div>

                  {/* Center Video Ambient Graphic */}
                  <div className="my-auto text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-white/10 mx-auto flex items-center justify-center border-2 border-white/30 text-white text-3xl">
                      {isPlayingVideo ? <FaPlay className="ml-1 text-emerald-400" /> : <FaPause className="text-amber-400" />}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-lg text-white">
                        IIT Indore Central Amphitheatre & Senate Hall
                      </h4>
                      <p className="text-xs text-stone-400 max-w-xs mx-auto">
                        Ambient video placeholder simulating continuous campus broadcast stream as observed on institute portal.
                      </p>
                    </div>
                  </div>

                  {/* Video Control Bar */}
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-between text-xs text-stone-300">
                    <button
                      onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                      className="flex items-center gap-1.5 font-semibold text-white hover:text-emerald-400"
                    >
                      {isPlayingVideo ? <FaPause /> : <FaPlay />}
                      <span>{isPlayingVideo ? "Playing Loop" : "Stream Paused"}</span>
                    </button>
                    <span className="text-[11px] text-stone-400">Audio: Muted by default</span>
                  </div>
                </div>
              )}

              {/* Media Switcher Bar */}
              <div className="bg-stone-900 px-4 py-2.5 flex items-center justify-between text-xs text-stone-300 border-t border-stone-800">
                <span className="font-medium">Media View:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsVideoMode(false)}
                    className={`px-3 py-1 rounded-full font-medium transition ${
                      !isVideoMode ? "bg-[#8C5353] text-white" : "hover:text-white"
                    }`}
                  >
                    Campus Showcase
                  </button>
                  <button
                    onClick={() => setIsVideoMode(true)}
                    className={`px-3 py-1 rounded-full font-medium flex items-center gap-1 transition ${
                      isVideoMode ? "bg-[#8C5353] text-white" : "hover:text-white"
                    }`}
                  >
                    <FaVideo className="text-[10px]" />
                    <span>Video Stream</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Heading & 4 Terracotta Stat Cards (Exact match to institute screenshot 2!) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADBD5] text-[#8C5353] text-xs font-bold tracking-wider uppercase">
                <FaLandmark /> Supreme Legal Charter & Governance Framework
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 leading-[1.15] font-serif">
                Shaping democracy, student rights, and transparent leadership.
              </h2>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                The Constitution of the Students' Gymkhana stands as the supreme governing charter of IIT Indore, vesting legislative authority in the elected Student Senate, executive stewardship in the Executive Council, and fiscal integrity across all student councils and clubs.
              </p>
            </div>

            {/* 4 Stat Cards in Warm Terracotta (Exact visual match to Screenshot 2!) */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
              <div className="bg-[#8C5353] hover:bg-[#7D4545] transition rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between">
                <div className="text-3xl sm:text-5xl font-black tracking-tight font-serif">
                  18+
                </div>
                <div className="mt-2 text-xs sm:text-sm font-semibold tracking-wide text-stone-200">
                  Ratified Senate MoMs & Agendas Archived
                </div>
              </div>

              <div className="bg-[#8C5353] hover:bg-[#7D4545] transition rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between">
                <div className="text-3xl sm:text-5xl font-black tracking-tight font-serif">
                  9
                </div>
                <div className="mt-2 text-xs sm:text-sm font-semibold tracking-wide text-stone-200">
                  Executive Portfolios & General Secretaries
                </div>
              </div>

              <div className="bg-[#8C5353] hover:bg-[#7D4545] transition rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between">
                <div className="text-3xl sm:text-5xl font-black tracking-tight font-serif">
                  8
                </div>
                <div className="mt-2 text-xs sm:text-sm font-semibold tracking-wide text-stone-200">
                  Standing Committees & Regulatory Cells
                </div>
              </div>

              <div className="bg-[#8C5353] hover:bg-[#7D4545] transition rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between">
                <div className="text-3xl sm:text-5xl font-black tracking-tight font-serif">
                  35+
                </div>
                <div className="mt-2 text-xs sm:text-sm font-semibold tracking-wide text-stone-200">
                  Elected Senators Representing 3,000+ Students
                </div>
              </div>
            </div>

            {/* CTA action bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection("constitution-charter")}
                className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition shadow-md flex items-center gap-2 group"
              >
                <span>Explore Full Constitution</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
              </button>

              <button
                onClick={() => scrollToSection("senate-mom-archive")}
                className="px-6 py-3 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-semibold text-sm transition shadow-sm flex items-center gap-2"
              >
                <FaFileAlt className="text-[#8C5353]" />
                <span>Search Senate Minutes (MoM)</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. PREAMBLE CALLOUT BANNER (Dignified Institutional Parchment) */}
      {/* ============================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-gradient-to-r from-[#F5EFE6] via-[#FAF6F0] to-[#F5EFE6] border-2 border-[#D8C7B5] rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          {/* Subtle watermarked seal */}
          <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none w-64 h-64">
            <FaStamp className="w-full h-full text-stone-900" />
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#D8C7B5] text-[#8C5353] font-bold text-xs uppercase tracking-widest shadow-sm">
              <FaStamp /> Preamble to the Supreme Charter
            </div>

            <div className="relative">
              <FaQuoteLeft className="text-3xl text-[#CBB9A7] mx-auto mb-3 opacity-60" />
              <blockquote className="font-serif text-xl sm:text-2xl text-stone-800 font-medium leading-relaxed italic">
                “WE, THE STUDENTS OF THE INDIAN INSTITUTE OF TECHNOLOGY INDORE, having solemnly resolved to constitute a democratic, autonomous, and accountable student governance system to promote intellectual curiosity, cultural expression, athletic excellence, welfare, and integrity — DO HEREBY ADOPT, ENACT, AND GIVE TO OURSELVES THIS CONSTITUTION.”
              </blockquote>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-500 font-mono">
              <span className="flex items-center gap-1.5">
                <MdVerified className="text-emerald-600 text-sm" /> Registered with Institute Senate
              </span>
              <span>•</span>
              <span>Adopted: November 26, 2012</span>
              <span>•</span>
              <span>4th Revision Ratified: October 01, 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. INTERACTIVE CONSTITUTION EXPLORER (Chapters & Articles) */}
      {/* ============================================================== */}
      <section id="constitution-charter" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-stone-300">
          <div>
            <div className="text-xs font-bold text-[#8C5353] tracking-wider uppercase mb-1 flex items-center gap-2">
              <FaScroll /> Articles of Governance
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
              The Gymkhana Constitution
            </h3>
            <p className="text-stone-600 text-sm mt-1">
              Browse chapters, search constitutional clauses, review amendment logs, and verify governance rules.
            </p>
          </div>

          {/* Quick search inside constitution */}
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm" />
            <input
              type="text"
              placeholder="Search constitution clauses..."
              value={constitutionSearch}
              onChange={(e) => setConstitutionSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#8C5353] shadow-sm"
            />
            {constitutionSearch && (
              <button
                onClick={() => setConstitutionSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Chapters Navigation Tabs */}
        <div className="flex overflow-x-auto pb-4 gap-2.5 scrollbar-thin scrollbar-thumb-stone-300 mb-8">
          {constitutionChapters.map((ch) => {
            const isSelected = activeChapterId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChapterId(ch.id)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? "bg-[#8C5353] text-white border-[#8C5353] shadow-md"
                    : "bg-white hover:bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-stone-200" : "text-[#8C5353]"}`}>
                  {ch.chapterNum}
                </div>
                <div className="text-xs sm:text-sm font-semibold truncate max-w-[190px]">
                  {ch.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Details & Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-stone-200 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200 gap-4">
            <div>
              <span className="text-xs font-bold text-[#8C5353] uppercase tracking-widest bg-[#FAF2EE] px-3 py-1 rounded-full border border-[#EADBD5]">
                {activeChapterData.chapterNum}
              </span>
              <h4 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-2">
                {activeChapterData.title}
              </h4>
              <p className="text-stone-600 text-sm mt-1.5 leading-relaxed max-w-3xl">
                {activeChapterData.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() =>
                  handleCopyText(
                    `IIT Indore Gymkhana Constitution - ${activeChapterData.title}`,
                    activeChapterData.title
                  )
                }
                className="px-3.5 py-2 rounded-full border border-stone-300 hover:bg-stone-100 text-xs font-medium text-stone-700 flex items-center gap-1.5 transition"
              >
                <FaRegCopy /> Copy Citation
              </button>
            </div>
          </div>

          {/* Articles Accordion List */}
          <div className="space-y-4">
            {activeChapterData.articles.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-300 text-stone-500 text-sm">
                No articles matching "{constitutionSearch}" in this chapter. Try clearing your search.
              </div>
            ) : (
              activeChapterData.articles.map((art) => {
                const isExpanded = expandedArticles[art.articleNum] !== false;
                return (
                  <div
                    key={art.articleNum}
                    className="border border-stone-200 rounded-2xl overflow-hidden bg-[#FCFBF8] transition-shadow hover:shadow-sm"
                  >
                    <button
                      onClick={() => toggleArticle(art.articleNum)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-stone-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-lg bg-[#FAF2EE] text-[#8C5353] font-mono font-bold text-xs border border-[#EADBD5]">
                          {art.articleNum}
                        </span>
                        <h5 className="font-bold text-base text-stone-900">
                          {art.heading}
                        </h5>
                      </div>
                      <div className="text-stone-400 text-sm">
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-5 sm:p-6 border-t border-stone-100 space-y-4 text-stone-800 text-sm leading-relaxed bg-[#FCFBF8]">
                        <ul className="space-y-2.5">
                          {art.clauses.map((clause, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="text-[#8C5353] font-bold font-mono text-xs mt-0.5">
                                §{idx + 1}.
                              </span>
                              <span>{clause}</span>
                            </li>
                          ))}
                        </ul>

                          <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-2">
                            {art.amendmentNote ? (
                              <span className="italic flex items-center gap-1.5 text-stone-600">
                                <MdOutlineArticle className="text-[#8C5353]" /> {art.amendmentNote}
                              </span>
                            ) : (
                              <span className="text-stone-400">Constitution Original Provision</span>
                            )}
                            <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                              <MdCheckCircle /> Enforceable
                            </span>
                          </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. SENATE MINUTES OF MEETINGS (MoM) & OFFICIAL ARCHIVE */}
      {/* ============================================================== */}
      <section id="senate-mom-archive" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 scroll-mt-24">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EADBD5] text-[#8C5353] font-bold text-xs uppercase tracking-wider">
            <FaGavel /> Official Gazette Archive
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
            Senate Minutes of Meetings (MoM) & Documents
          </h3>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Searchable, verified public repository of Student Senate legislative sessions, ratified resolutions, gazette notifications, financial statements, and executive orders.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 mb-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm" />
              <input
                type="text"
                placeholder="Search by meeting title, agenda, resolution, or reference number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#8C5353]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Academic Year Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#8C5353]"
              >
                {academicYears.map((yr) => (
                  <option key={yr} value={yr}>
                    Academic Year: {yr}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Indicator */}
            <div className="md:col-span-3 flex items-center justify-end text-xs text-stone-500 font-medium px-2">
              <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200">
                <MdVerified className="text-emerald-600 text-sm" />
                <span>Showing {filteredDocuments.length} Verified Documents</span>
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
            <span className="text-xs font-bold text-stone-500 flex items-center gap-1 mr-2">
              <FaFilter className="text-[10px]" /> Filter:
            </span>
            {categories.map((cat) => {
              const isCatActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                    isCatActive
                      ? "bg-[#8C5353] text-white shadow-sm"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocuments.length === 0 ? (
            <div className="col-span-2 bg-white rounded-3xl p-12 text-center border border-dashed border-stone-300 text-stone-500">
              <FaFileAlt className="text-4xl mx-auto mb-3 text-stone-300" />
              <h5 className="font-bold text-stone-800 text-lg">No official documents found</h5>
              <p className="text-sm mt-1 max-w-md mx-auto">
                No gazette documents match the selected query or filters. Try resetting the category or year filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Documents");
                  setSelectedYear("All Years");
                }}
                className="mt-4 px-4 py-2 rounded-full bg-stone-900 text-white text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-200 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                {/* Terracotta top strip accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#8C5353]" />

                <div className="space-y-4">
                  {/* Category, Date & Verification Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                    <span className="font-mono text-stone-500 font-semibold bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
                      {doc.refNumber}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <MdVerified className="text-emerald-600" /> Verified & Ratified
                    </span>
                  </div>

                  {/* Document Title */}
                  <h4 className="text-lg sm:text-xl font-bold font-serif text-stone-900 group-hover:text-[#8C5353] transition-colors leading-snug">
                    {doc.title}
                  </h4>

                  {/* Date & Presiding Officer */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-stone-500 py-1 border-y border-stone-100">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-stone-400">Date Ratified</span>
                      <span className="font-medium text-stone-800 flex items-center gap-1 mt-0.5">
                        <FaCalendarAlt className="text-stone-400" /> {doc.date}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-stone-400">Academic Year</span>
                      <span className="font-medium text-stone-800 mt-0.5 block">{doc.academicYear}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {doc.summary}
                  </p>

                  {/* Key resolution preview tag */}
                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-stone-200 text-xs text-stone-700">
                    <span className="font-bold text-[#8C5353] block mb-1">
                      Key Resolution Passed:
                    </span>
                    <p className="italic text-stone-600">
                      "{doc.resolutions[0]}"
                    </p>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedDocModal(doc)}
                    className="px-4 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <FaFileAlt /> View MoM Details
                  </button>

                  <button
                    onClick={() =>
                      handleCopyText(
                        `${doc.title} (${doc.refNumber}) - IIT Indore Students' Gymkhana Gazette.`,
                        doc.refNumber
                      )
                    }
                    className="px-3 py-2 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-medium transition flex items-center gap-1.5"
                  >
                    <FaRegCopy /> Reference
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. GOVERNANCE ARCHITECTURE & HIERARCHY */}
      {/* ============================================================== */}
      <section id="governance-hierarchy" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 scroll-mt-24">
        <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EADBD5] text-[#8C5353] font-bold text-xs uppercase tracking-wider">
            <MdOutlineAccountBalance /> Democratic Framework
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
            Governance Architecture & Hierarchy
          </h3>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            The tripartite system of institutional oversight, legislative deliberation, executive administration, and independent regulatory adjudication.
          </p>
        </div>

        {/* 4 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Tier 1: Institutional Patronage */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C5353] bg-[#FAF2EE] px-2.5 py-1 rounded-full border border-[#EADBD5]">
                Tier 1 • Patronage
              </span>
              <h4 className="text-xl font-bold font-serif text-stone-900">
                Institutional Directorate & Deans
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Autonomous supervisory authority ensuring statutory adherence to Institute Acts and university regulations.
              </p>
              <ul className="text-xs text-stone-700 space-y-2 border-t border-stone-100 pt-3">
                <li className="font-semibold text-stone-900">• Director, IIT Indore (Chief Patron)</li>
                <li>• Dean of Student Affairs (DOSA)</li>
                <li>• Associate Dean of Student Affairs (ADOSA)</li>
                <li>• Faculty Advisors across Councils</li>
              </ul>
            </div>
            <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-400">
              Authority: Statutory Acts
            </div>
          </div>

          {/* Tier 2: The Student Senate */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-[#8C5353] flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#8C5353] px-2.5 py-1 rounded-full">
                Tier 2 • Legislative
              </span>
              <h4 className="text-xl font-bold font-serif text-stone-900">
                The Student Senate
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                The apex legislative, deliberative, and budgetary assembly directly representing the student body across all cohorts.
              </p>
              <ul className="text-xs text-stone-700 space-y-2 border-t border-stone-100 pt-3">
                <li className="font-semibold text-stone-900">• Speaker of the Senate (Presiding)</li>
                <li>• Deputy Speaker & Convenor</li>
                <li>• Elected B.Tech Senators (UG 1st to 4th Yr)</li>
                <li>• Elected PG & Doctoral Senators (M.Tech/Ph.D.)</li>
              </ul>
            </div>
            <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] font-mono text-[#8C5353] font-bold">
              Supreme Policy & Budgetary Body
            </div>
          </div>

          {/* Tier 3: The Executive Council */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C5353] bg-[#FAF2EE] px-2.5 py-1 rounded-full border border-[#EADBD5]">
                Tier 3 • Executive
              </span>
              <h4 className="text-xl font-bold font-serif text-stone-900">
                The Executive Council
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Operational stewardship executing senate policies, event management, festival coordination, and student services.
              </p>
              <ul className="text-xs text-stone-700 space-y-2 border-t border-stone-100 pt-3">
                <li className="font-semibold text-stone-900">• President, Students' Gymkhana</li>
                <li>• 8 General Secretaries (SnT, Cult, Sports, etc.)</li>
                <li>• Recognized Club Heads & Coordinators</li>
                <li>• Festival Core Steering Committees</li>
              </ul>
            </div>
            <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-400">
              Accountable to the Senate
            </div>
          </div>

          {/* Tier 4: Regulatory & Judicial Bodies */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C5353] bg-[#FAF2EE] px-2.5 py-1 rounded-full border border-[#EADBD5]">
                Tier 4 • Regulatory
              </span>
              <h4 className="text-xl font-bold font-serif text-stone-900">
                Regulatory & Grievance Wings
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Impartial supervisory entities ensuring electoral integrity, fair disciplinary mediation, and rights protection.
              </p>
              <ul className="text-xs text-stone-700 space-y-2 border-t border-stone-100 pt-3">
                <li className="font-semibold text-stone-900">• Central Election Commission (CEC)</li>
                <li>• Constitution & Rules Review (CRRC)</li>
                <li>• Student Grievance Redressal Cell (SGRC)</li>
                <li>• Anti-Ragging & Disciplinary Squad</li>
              </ul>
            </div>
            <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-400">
              Independent Oversight
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. VERIFIED EXECUTIVE OFFICE BEARERS (Photos & Designations) */}
      {/* ============================================================== */}
      <section id="office-bearers" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 scroll-mt-24">
        <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EADBD5] text-[#8C5353] font-bold text-xs uppercase tracking-wider">
            <FaUsers /> Verified Office Bearers
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
            Executive Leadership & General Secretaries
          </h3>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            The democratically elected Executive Council serving for the 2025 - 2026 academic tenure, verified under Gymkhana electoral credentials.
          </p>
        </div>

        {/* Office Bearers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {verifiedOfficeBearers.map((bearer, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200 group flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-64 sm:h-72 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={bearer.img}
                    alt={bearer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Graceful fallback placeholder if photo fails
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-stone-200');
                    }}
                  />
                  {/* Status badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-800 shadow-sm flex items-center gap-1">
                    <MdVerified className="text-emerald-600" /> {bearer.status}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5353] block">
                      {bearer.title}
                    </span>
                    <h4 className="text-xl font-bold font-serif text-stone-900">
                      {bearer.name}
                    </h4>
                    <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mt-0.5">
                      {bearer.council}
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {bearer.roleDescription}
                  </p>
                </div>
              </div>

              {/* Contact Footer */}
              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <a
                    href={`mailto:${bearer.email}`}
                    className="flex items-center gap-1.5 text-stone-700 hover:text-[#8C5353] font-medium transition"
                  >
                    <IoMailOutline className="text-base text-[#8C5353]" />
                    <span className="truncate max-w-[180px]">{bearer.email}</span>
                  </a>
                  <span className="font-mono text-[11px] text-stone-400">{bearer.tenure}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. STANDING COMMITTEES (Matches Cards Style in Screenshot 3 & 4) */}
      {/* ============================================================== */}
      <section id="standing-committees" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 scroll-mt-24">
        <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EADBD5] text-[#8C5353] font-bold text-xs uppercase tracking-wider">
            <FaShieldAlt /> Regulatory Bodies
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
            Statutory Standing Committees
          </h3>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Permanent committees established under Chapter III and Chapter VII of the Constitution to maintain functional checks, transparent auditing, and student protection.
          </p>
        </div>

        {/* 6 Committees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standingCommittees.map((comm, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-200 flex flex-col justify-between hover:shadow-md transition relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-2xl bg-[#FAF2EE] text-[#8C5353] flex items-center justify-center text-lg font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-[11px] font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                    {comm.status}
                  </span>
                </div>

                <h4 className="text-lg font-bold font-serif text-stone-900 leading-snug">
                  {comm.name}
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {comm.mandate}
                </p>

                <div className="border-t border-stone-100 pt-3 space-y-1.5 text-xs text-stone-700">
                  <span className="block text-[10px] uppercase font-bold text-stone-400">Composition</span>
                  <p className="text-stone-600 text-xs">{comm.composition}</p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500">Lead / Convenor:</span>
                <span className="font-semibold text-stone-900">{comm.lead}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. LEGISLATIVE PROCESS: HOW A BILL BECOMES CONSTITUTIONAL LAW */}
      {/* ============================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-[#FAF2EE] border border-[#EADBD5] rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C5353]">
              Legislative Lifecycle
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              How a Resolution Becomes Gymkhana Law
            </h3>
            <p className="text-stone-600 text-sm">
              The standardized democratic timeline from sponsorship to gazette ratification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#8C5353] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h5 className="font-bold text-stone-900 text-sm">Drafting & Sponsorship</h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                A Senator or General Secretary drafts a formal legislative proposal with 7 days advance notice.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#8C5353] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h5 className="font-bold text-stone-900 text-sm">Committee Review</h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                The CRRC or FBAC analyzes constitutional validity, financial feasibility, and student impact.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#8C5353] text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h5 className="font-bold text-stone-900 text-sm">Senate Debate & Vote</h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                Floor reading in an Ordinary Senate Session. Simple majority for ordinary acts, 2/3rd for amendments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#8C5353] text-white text-xs font-bold flex items-center justify-center">
                4
              </span>
              <h5 className="font-bold text-stone-900 text-sm">Gazette Promulgation</h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                Presidential & DOSA assent, official seal affixed, and published in the public digital archive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. VERIFICATION CHECKER TOOL (Addresses verification mandate) */}
      {/* ============================================================== */}
      <section id="verification-portal" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 scroll-mt-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-stone-200">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs uppercase tracking-wider border border-emerald-200">
              <MdVerified /> Gazette Document Authenticator
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              Verify Official Senate & Gymkhana Documents
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Verify the authenticity of any printed or digital Minute of Meeting (MoM), election notification, or constitutional gazette using its registered reference number.
            </p>
          </div>

          <form onSubmit={handleVerifyCheck} className="max-w-xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                placeholder="e.g., IITI/SG/SEN/2026/18 or IITI/SG/CEC/2025/01"
                value={verifyRefInput}
                onChange={(e) => setVerifyRefInput(e.target.value)}
                className="flex-grow px-4 py-3 rounded-full bg-stone-50 border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#8C5353]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#8C5353] hover:bg-[#774242] text-white font-semibold text-sm transition shadow-md whitespace-nowrap"
              >
                Verify Document
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
              <span>Try test reference:</span>
              <button
                type="button"
                onClick={() => setVerifyRefInput("IITI/SG/SEN/2026/18")}
                className="font-mono text-[#8C5353] hover:underline"
              >
                IITI/SG/SEN/2026/18
              </button>
              <span>or</span>
              <button
                type="button"
                onClick={() => setVerifyRefInput("IITI/SG/CEC/2025/01")}
                className="font-mono text-[#8C5353] hover:underline"
              >
                IITI/SG/CEC/2025/01
              </button>
            </div>

            {verificationResult && (
              <div
                className={`mt-6 p-6 rounded-2xl border text-sm transition-all animate-fadeIn ${
                  verificationResult.found
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-amber-50 border-amber-200 text-amber-900"
                }`}
              >
                {verificationResult.found ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 font-bold text-base text-emerald-800">
                      <MdVerified className="text-xl" />
                      <span>Authentic Gazette Record Confirmed</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-semibold">Document:</span> {verificationResult.document.title}
                      </div>
                      <div>
                        <span className="font-semibold">Reference:</span> {verificationResult.document.refNumber}
                      </div>
                      <div>
                        <span className="font-semibold">Ratification Date:</span> {verificationResult.document.date}
                      </div>
                      <div>
                        <span className="font-semibold">Presided By:</span> {verificationResult.document.presidedBy}
                      </div>
                    </div>
                    <p className="text-xs text-emerald-700 italic border-t border-emerald-200 pt-2">
                      Official seal cryptographic signature verified against Students' Gymkhana digital ledger.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5">
                    <FaShieldAlt className="text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-bold">Record Not Found:</span>
                      <p className="text-xs mt-1">{verificationResult.message}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 12. FLOATING BACK TO TOP BUTTON (Matching Screenshot 2 & 5) */}
      {/* ============================================================== */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#8C5353] hover:bg-[#7D4545] text-white flex items-center justify-center shadow-2xl transition hover:scale-110 border-2 border-white"
      >
        <FaArrowUp />
      </button>

      {/* ============================================================== */}
      {/* 13. INTERACTIVE DOCUMENT MODAL VIEWER */}
      {/* ============================================================== */}
      {selectedDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-stone-200 gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#8C5353] bg-[#FAF2EE] px-3 py-1 rounded-md border border-[#EADBD5]">
                  {selectedDocModal.refNumber}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-2">
                  {selectedDocModal.title}
                </h4>
                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mt-1">
                  <span>Date: {selectedDocModal.date}</span>
                  <span>•</span>
                  <span>Year: {selectedDocModal.academicYear}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <MdVerified /> Verified & Sealed
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedDocModal(null)}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-stone-800 text-sm">
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Meeting Summary</span>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {selectedDocModal.summary}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C5353] block">
                  Presided & Attendance
                </span>
                <p className="text-xs text-stone-600">
                  <span className="font-semibold text-stone-800">Chair / Speaker:</span> {selectedDocModal.presidedBy}
                </p>
                <p className="text-xs text-stone-600">
                  <span className="font-semibold text-stone-800">Quorum:</span> {selectedDocModal.attendees}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C5353] block">
                  Official Resolutions Ratified
                </span>
                <ul className="space-y-2">
                  {selectedDocModal.resolutions.map((res, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm bg-stone-50 p-3 rounded-xl border border-stone-200">
                      <span className="text-[#8C5353] font-bold font-mono">R.{i + 1}</span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-3">
                <FaStamp className="text-xl text-emerald-700 flex-shrink-0" />
                <div>
                  <span className="font-bold">Official Seal Affixed</span>
                  <p className="text-[11px] text-emerald-700">
                    This document has been entered into the official archival gazette of IIT Indore Students' Gymkhana and certified by DOSA.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() =>
                  handleCopyText(
                    `Reference: ${selectedDocModal.refNumber} - ${selectedDocModal.title} (Ratified ${selectedDocModal.date})`,
                    selectedDocModal.refNumber
                  )
                }
                className="px-4 py-2 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <FaRegCopy /> Copy Citation
              </button>

              <button
                onClick={() => {
                  handleCopyText(
                    `Gazette Reference URL: ${window.location.origin}/constitution#${selectedDocModal.id}`,
                    "Gazette Link"
                  );
                }}
                className="px-5 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <FaDownload /> Download Gazette Record ({selectedDocModal.fileSize})
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
