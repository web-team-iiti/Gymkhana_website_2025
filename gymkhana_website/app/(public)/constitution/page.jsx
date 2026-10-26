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

  // Chapter Reader Modal state (replaces raw page text clutter)
  const [selectedChapterModal, setSelectedChapterModal] = useState(null);

  // Media / Video toggle for the Hero section
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);

  // Document Verification Checker state
  const [verifyRefInput, setVerifyRefInput] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  // Copy notice toast
  const [copyFeedback, setCopyFeedback] = useState("");

  const categories = [
    "All Documents",
    "Senate MoMs",
    "Constitutional Amendments",
    "Financial Reports",
    "Election Code",
    "Regulations & Codes"
  ];

  // Filtered Documents
  const filteredDocuments = useMemo(() => {
    return officialDocumentsArchive.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.refNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === "All Documents" || doc.category === selectedCategory;

      const matchesYear =
        selectedYear === "All Years" || doc.academicYear === selectedYear;

      return matchesSearch && matchesCat && matchesYear;
    });
  }, [searchQuery, selectedCategory, selectedYear]);

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
    <div className="min-h-screen bg-white text-slate-900 font-[Outfit,sans-serif] selection:bg-blue-100 selection:text-blue-900 relative">

      {/* ── Background Texture ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-15"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "28px 28px"
        }}
      />

      {/* ── Copy Toast ── */}
      {copyFeedback && (
        <div className="fixed bottom-20 right-6 z-50 bg-[#0d2234] text-white px-5 py-3 rounded-2xl shadow-2xl text-sm flex items-center gap-2 border border-blue-900/40 animate-fadeIn">
          <FaCheckCircle className="text-sky-400" />
          <span>{copyFeedback}</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. SLIM SUB-NAV BAR                                            */}
      {/* ============================================================== */}
      <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-700 shrink-0 mr-1">Jump to:</span>
          {[
            { label: "Overview", id: "hero-overview" },
            { label: "Constitution Chapters", id: "constitution-chapters" },
            { label: "Senate MoMs", id: "senate-mom-archive" },
            { label: "Governance", id: "governance-hierarchy" },
            { label: "Office Bearers", id: "office-bearers" },
            { label: "Committees", id: "standing-committees" },
            { label: "Verify Doc", id: "verification-portal" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 text-slate-700 text-xs font-semibold transition-all duration-150 hover:border-blue-300"
            >
              {item.label}
            </button>
          ))}
          <div className="ml-auto shrink-0">
            <button
              onClick={() => scrollToSection("verification-portal")}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm"
            >
              <MdVerified className="text-sm" /> Verify Doc
            </button>
          </div>
        </div>
      </div>

      {/* ── Gazette Notice Bar ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-blue-50/70 border border-blue-200 rounded-full px-5 py-2.5 shadow-sm text-slate-800">
          <div className="flex items-center gap-3 overflow-hidden text-sm">
            <span className="font-bold text-xs uppercase tracking-wider text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full whitespace-nowrap border border-blue-200">
              Latest Gazette
            </span>
            <p className="truncate text-slate-700 font-medium text-xs sm:text-sm">
              18th Ordinary Senate MoM &amp; 4th Constitutional Amendment ratified.
            </p>
          </div>
          <button
            onClick={() => scrollToSection("senate-mom-archive")}
            className="flex-shrink-0 text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 transition ml-auto"
          >
            Browse MoMs <FaArrowRight className="text-[10px]" />
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. HERO SECTION (Punchy, Clean, Non-Wordy)                     */}
      {/* ============================================================== */}
      <section id="hero-overview" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Visual Card */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 group">
              {!isVideoMode ? (
                <div className="relative h-[380px] w-full">
                  <Image
                    src="/iiti_campus_building.jpg"
                    alt="IIT Indore Modern Campus Architecture"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow flex items-center gap-2 border border-slate-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Supreme Charter • In Force
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0d2234]/90 backdrop-blur-md text-white border border-white/15">
                    <h3 className="font-bold text-base">Students' Gymkhana Constitution</h3>
                    <p className="text-xs text-slate-300 mt-0.5">IIT Indore • 4th Revision Ratified</p>
                    <div className="mt-2.5 flex items-center justify-between pt-2.5 border-t border-white/10 text-xs">
                      <span className="text-slate-400 font-mono">Reg: IITI/SG/CONST/REV-04</span>
                      <button onClick={() => scrollToSection("constitution-chapters")} className="text-sky-300 font-semibold hover:text-white transition">
                        Explore Chapters →
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative h-[380px] w-full bg-slate-950 flex flex-col justify-between p-6 text-white text-center">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-red-600 text-xs font-bold animate-pulse">LIVE STREAM</span>
                    <span className="text-xs text-slate-400 font-mono">Senate Hall</span>
                  </div>
                  <div className="my-auto space-y-2">
                    <div className="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center border border-white/20 text-2xl">
                      {isPlayingVideo ? <FaPlay className="ml-1 text-sky-400" /> : <FaPause className="text-slate-400" />}
                    </div>
                    <p className="text-xs text-slate-300">Continuous campus broadcast placeholder.</p>
                  </div>
                  <button onClick={() => setIsPlayingVideo(!isPlayingVideo)} className="text-xs text-sky-300 hover:underline">
                    {isPlayingVideo ? "Pause Stream" : "Resume Stream"}
                  </button>
                </div>
              )}

              {/* View Switcher */}
              <div className="bg-[#0d2234] px-4 py-2 flex items-center justify-between text-xs text-slate-300 border-t border-slate-800">
                <span className="text-slate-400">Media View:</span>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setIsVideoMode(false)} className={`px-3 py-1 rounded-full font-medium transition ${!isVideoMode ? "bg-blue-600 text-white" : "hover:text-white"}`}>Campus</button>
                  <button onClick={() => setIsVideoMode(true)} className={`px-3 py-1 rounded-full font-medium transition ${isVideoMode ? "bg-blue-600 text-white" : "hover:text-white"}`}>Stream</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
                <FaLandmark /> Supreme Legal Charter
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Students' Gymkhana Constitution
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                The supreme governing framework of IIT Indore, vesting legislative authority in the elected Student Senate, executive stewardship in the Executive Council, and safeguarding student rights.
              </p>
            </div>

            {/* 4 Crisp Stat Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { num: "18+", label: "Senate MoMs" },
                { num: "9", label: "Executive Portfolios" },
                { num: "6", label: "Committees & Cells" },
                { num: "35+", label: "Elected Senators" },
              ].map((s, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-blue-600 font-[Outfit,sans-serif]">{s.num}</div>
                  <div className="text-xs font-medium text-slate-600 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => scrollToSection("constitution-chapters")}
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition shadow-sm flex items-center gap-2"
              >
                <FaBookOpen /> Explore Chapters
              </button>
              <button
                onClick={() => scrollToSection("senate-mom-archive")}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-blue-700 text-xs sm:text-sm font-semibold transition flex items-center gap-2"
              >
                <FaFileAlt className="text-blue-600" /> Senate Minutes Archive
              </button>
              <button
                onClick={() => handleCopyText(`${window.location.origin}/constitution#charter`, "Constitution Link")}
                className="px-4 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium transition flex items-center gap-1.5"
              >
                <FaRegCopy /> Copy Citation
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. CONSTITUTION CHAPTERS (Interactive Card Grid)               */}
      {/* ============================================================== */}
      <section id="constitution-chapters" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-32">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Charter Articles</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Constitution Chapters</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-0.5">Click any chapter to view its codified articles, mandates, and enforceable clauses.</p>
          </div>
          <div className="shrink-0">
            <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              8 Enacted Chapters
            </span>
          </div>
        </div>

        {/* Compact Chapter Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {constitutionChapters.map((ch, idx) => (
            <div
              key={ch.id}
              onClick={() => setSelectedChapterModal(ch)}
              className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold font-mono text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {ch.chapterNum}
                  </span>
                  <span className="text-xs text-slate-400 group-hover:text-blue-600 transition-colors">
                    {ch.articles.length} {ch.articles.length === 1 ? "Article" : "Articles"}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {ch.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {ch.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-800">
                <span>View Articles</span>
                <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SENATE MINUTES (MoM) ARCHIVE (Streamlined, Scannable List)   */}
      {/* ============================================================== */}
      <section id="senate-mom-archive" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Legislative Gazette</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Senate Minutes of Meetings (MoM)</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-0.5">Verified public repository of Student Senate legislative resolutions and executive orders.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200">
              <MdVerified className="inline mr-1 text-sm text-blue-600" /> {filteredDocuments.length} Verified Records
            </span>
          </div>
        </div>

        {/* Search & Category Filter Box */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search meeting title, agenda, or reference code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs">Clear</button>
              )}
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
            >
              {["All Years", "2025-26", "2024-25", "2023-24"].map((yr) => (
                <option key={yr} value={yr}>Year: {yr}</option>
              ))}
            </select>
          </div>

          {/* Quick Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Clean, Scannable Document List */}
        <div className="space-y-3">
          {filteredDocuments.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-slate-300 text-slate-500">
              <p className="text-sm font-semibold">No records match your filters.</p>
              <button onClick={() => { setSearchQuery(""); setSelectedCategory("All Documents"); setSelectedYear("All Years"); }}
                className="mt-3 px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold">
                Reset Filters
              </button>
            </div>
          ) : (
            filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {doc.refNumber}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <FaCalendarAlt className="text-[10px] text-slate-400" /> {doc.date}
                    </span>
                    <span className="text-xs text-slate-400">• {doc.academicYear}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 hover:text-blue-700 transition-colors cursor-pointer truncate" onClick={() => setSelectedDocModal(doc)}>
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-1">
                    <span className="font-semibold text-blue-800">Resolution:</span> {doc.resolutions[0]}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedDocModal(doc)}
                    className="px-4 py-1.5 rounded-full bg-[#0d2234] hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <FaFileAlt className="text-[11px]" /> View MoM
                  </button>
                  <button
                    onClick={() => handleCopyText(`${doc.title} (${doc.refNumber})`, doc.refNumber)}
                    className="px-3 py-1.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium transition"
                  >
                    Citation
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. GOVERNANCE ARCHITECTURE (Concise 4-Pillar Layout)           */}
      {/* ============================================================== */}
      <section id="governance-hierarchy" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-32">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Democratic Framework</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Governance Architecture</h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">The constitutional division of institutional advisory, legislative deliberation, and executive stewardship.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              tier: "Tier 1 • Patronage",
              title: "Directorate & Deans",
              desc: "Statutory oversight ensuring adherence to Institute Acts and educational charters.",
              lead: "Director & Dean of Student Affairs",
              authority: "Statutory Oversight"
            },
            {
              tier: "Tier 2 • Legislative",
              title: "The Student Senate",
              desc: "Apex legislative, policy-making, and budgetary body directly representing all students.",
              lead: "Speaker & Elected Senators",
              authority: "Supreme Legislative Body"
            },
            {
              tier: "Tier 3 • Executive",
              title: "The Executive Council",
              desc: "Operational stewardship executing policies, campus festivals, clubs, and council initiatives.",
              lead: "President & 8 General Secretaries",
              authority: "Accountable to Senate"
            },
            {
              tier: "Tier 4 • Regulatory",
              title: "Regulatory Cells",
              desc: "Independent bodies guaranteeing electoral integrity, rules review, and grievance redressal.",
              lead: "Central Election Commission & CRRC",
              authority: "Autonomous Oversight"
            },
          ].map((t, i) => (
            <div
              key={i}
              className={`rounded-2xl p-5 border flex flex-col justify-between transition-all hover:shadow-md ${
                i === 1
                  ? "bg-[#0d2234] border-blue-400 text-white"
                  : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              <div className="space-y-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block ${
                  i === 1 ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}>
                  {t.tier}
                </span>
                <h3 className={`font-bold text-lg ${i === 1 ? "text-white" : "text-slate-900"}`}>{t.title}</h3>
                <p className={`text-xs leading-relaxed ${i === 1 ? "text-slate-300" : "text-slate-600"}`}>{t.desc}</p>
              </div>

              <div className={`mt-4 pt-3 border-t text-xs ${i === 1 ? "border-slate-800 text-sky-300" : "border-slate-100 text-slate-700"}`}>
                <span className="font-semibold block text-[11px] opacity-80">Primary Leadership:</span>
                <span>{t.lead}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. OFFICE BEARERS (Clean Visual Profile Cards)                 */}
      {/* ============================================================== */}
      <section id="office-bearers" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-32">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Executive Council</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Verified Office Bearers</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-0.5">Democratically elected student leaders for the 2025–2026 academic tenure.</p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            9 Portfolios Verified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {verifiedOfficeBearers.map((bearer, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex items-center gap-4 group"
            >
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                <img
                  src={bearer.img}
                  alt={bearer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.classList.add("flex","items-center","justify-center","bg-blue-50"); }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block truncate">
                  {bearer.title}
                </span>
                <h3 className="font-bold text-base text-slate-900 truncate">{bearer.name}</h3>
                <p className="text-xs text-slate-500 truncate">{bearer.council}</p>

                <a
                  href={`mailto:${bearer.email}`}
                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-blue-600 transition"
                >
                  <IoMailOutline className="text-xs text-blue-600" />
                  <span className="truncate max-w-[160px]">{bearer.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. STANDING COMMITTEES (Compact Cards)                         */}
      {/* ============================================================== */}
      <section id="standing-committees" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-32">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Statutory Oversight</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Standing Committees</h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">Permanent committees ensuring checks, balances, and operational compliance.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {standingCommittees.map((comm, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
                    {idx + 1}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Active
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900">{comm.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{comm.mandate}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Lead / Chair:</span>
                <span className="font-semibold text-slate-800">{comm.lead}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. QUICK VERIFICATION CHECKER (Compact 1-Row Widget)           */}
      {/* ============================================================== */}
      <section id="verification-portal" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-32">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
          <div className="max-w-xl mx-auto text-center space-y-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider border border-blue-200">
              <MdVerified /> Gazette Document Authenticator
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Verify Official Senate Documents</h2>
            <p className="text-slate-600 text-xs sm:text-sm">Verify the authenticity of any ratified MoM or constitutional gazette by reference number.</p>
          </div>

          <form onSubmit={handleVerifyCheck} className="max-w-lg mx-auto space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter reference e.g., IITI/SG/SEN/2026/18"
                value={verifyRefInput}
                onChange={(e) => setVerifyRefInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-full bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition shrink-0"
              >
                Verify
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span>Try:</span>
              <button type="button" onClick={() => setVerifyRefInput("IITI/SG/SEN/2026/18")} className="font-mono text-blue-600 hover:underline">IITI/SG/SEN/2026/18</button>
              <span>or</span>
              <button type="button" onClick={() => setVerifyRefInput("IITI/SG/CEC/2025/01")} className="font-mono text-blue-600 hover:underline">IITI/SG/CEC/2025/01</button>
            </div>

            {verificationResult && (
              <div className={`mt-4 p-4 rounded-xl border text-xs animate-fadeIn ${
                verificationResult.found ? "bg-white border-blue-200 text-slate-900 shadow-md" : "bg-red-50 border-red-200 text-red-900"
              }`}>
                {verificationResult.found ? (
                  <div className="space-y-1.5">
                    <div className="font-bold text-blue-700 flex items-center gap-1.5 text-sm">
                      <MdVerified /> Authentic Gazette Record
                    </div>
                    <div><span className="font-semibold">Title:</span> {verificationResult.document.title}</div>
                    <div><span className="font-semibold">Ref:</span> {verificationResult.document.refNumber} • {verificationResult.document.date}</div>
                  </div>
                ) : (
                  <p className="font-medium">{verificationResult.message}</p>
                )}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-[#0d2234] hover:bg-blue-600 text-white flex items-center justify-center shadow-xl transition hover:scale-105 border border-white/20"
      >
        <FaArrowUp className="text-xs" />
      </button>

      {/* ============================================================== */}
      {/* 9. CHAPTER CLAUSES MODAL (Interactive reader instead of wall)   */}
      {/* ============================================================== */}
      {selectedChapterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {selectedChapterModal.chapterNum}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedChapterModal.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedChapterModal.summary}</p>
              </div>
              <button
                onClick={() => setSelectedChapterModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition shrink-0"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              {selectedChapterModal.articles.map((art) => (
                <div key={art.articleNum} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {art.articleNum}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{art.heading}</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 pl-1">
                    {art.clauses.map((cl, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold shrink-0">§{i + 1}.</span>
                        <span>{cl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedChapterModal(null)}
                className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 10. DOCUMENT DETAILS MODAL                                      */}
      {/* ============================================================== */}
      {selectedDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {selectedDocModal.refNumber}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">{selectedDocModal.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span>{selectedDocModal.date}</span>
                  <span>•</span>
                  <span>{selectedDocModal.academicYear}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedDocModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition shrink-0"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Summary</span>
                <p>{selectedDocModal.summary}</p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">Key Resolutions Ratified</span>
                <ul className="space-y-1.5">
                  {selectedDocModal.resolutions.map((res, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                      <span className="text-blue-600 font-bold">R.{i + 1}</span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 text-blue-900 text-xs border border-blue-200">
                <MdVerified className="text-base text-blue-600 shrink-0" />
                <span>Certified official record preserved in Students' Gymkhana archival gazette.</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => handleCopyText(`${selectedDocModal.title} (${selectedDocModal.refNumber})`, selectedDocModal.refNumber)}
                className="px-4 py-1.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold"
              >
                Copy Reference
              </button>
              <button
                onClick={() => setSelectedDocModal(null)}
                className="px-5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
