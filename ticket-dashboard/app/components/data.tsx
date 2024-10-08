import React from "react";
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "SUBJECT", uid: "subject" },
  { name: "AGE", uid: "age", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "TEAM", uid: "team" },
  { name: "EMAIL", uid: "email" },
  { name: "PRIORITY", uid: "priority", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "AGENT", uid: "agent" },
];

const statusOptions = [
  { name: "Recent", uid: "recent" },
  { name: "Overdue", uid: "overdue" },
  { name: "Responded", uid: "responded" },
  { name: "Remaining", uid: "remaining" },
  { name: "Closed", uid: "closed" },
];

const usersDB = [
  {
    id: 1,
    name: "Tony Reichert",
    subject: "need help #2132",
    role: "CEO",
    team: "Management",
    status: "Recent",
    priority: "urgent",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
    agent: "Anindy",
  },
  {
    id: 2,
    name: "Zoey Lang",
    subject: "need help #2132",
    role: "Tech Lead",
    team: "Development",
    status: "Overdue",
    priority: "high",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
    agent: "Norwin",
  },
  {
    id: 3,
    name: "Jane Fisher",
    subject: "need help #2132",
    role: "Sr. Dev",
    team: "Development",
    status: "Remaining",
    priority: "urgent",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
    agent: "Anindy",
  },
  {
    id: 4,
    name: "William Howard",
    subject: "need help #2132",
    role: "C.M.",
    team: "Marketing",
    status: "Responded",
    priority: "low",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
    agent: "indy",
  },
  {
    id: 5,
    name: "Kristen Copper",
    subject: "need help #2132",
    role: "S. Manager",
    team: "Sales",
    status: "Closed",
    priority: "urgent",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
    agent: "Norwin",
  },
  {
    id: 6,
    name: "Brian Kim",
    subject: "need help #2132",
    role: "P. Manager",
    team: "Management",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "brian.kim@example.com",
    status: "Recent",
    priority: "urgent",
    agent: "Anindy",
  },
  {
    id: 7,
    name: "Michael Hunt",
    subject: "need help #2132",
    role: "Designer",
    team: "Design",
    status: "Overdue",
    priority: "high",
    age: "27",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    email: "michael.hunt@example.com",
    agent: "orwin",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    subject: "need help #2132",
    role: "HR Manager",
    team: "HR",
    status: "Responded",
    priority: "urgent",
    age: "31",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
    email: "samantha.brooks@example.com",
    agent: "Anindy",
  },
  {
    id: 9,
    name: "Frank Harrison",
    subject: "need help #2132",
    role: "F. Manager",
    team: "Finance",
    status: "Remaining",
    priority: "low",
    age: "33",
    avatar: "https://i.pravatar.cc/150?img=4",
    email: "frank.harrison@example.com",
    agent: "Anindy",
  },
  {
    id: 10,
    name: "Emma Adams",
    subject: "need help #2132",
    role: "Ops Manager",
    team: "Operations",
    status: "Closed",
    priority: "urgent",
    age: "35",
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "emma.adams@example.com",
    agent: "Norwin",
  },
  {
    id: 11,
    name: "Brandon Stevens",
    subject: "need help #2132",
    role: "Jr. Dev",
    team: "Development",
    status: "Recent",
    priority: "urgent",
    age: "22",
    avatar: "https://i.pravatar.cc/150?img=8",
    email: "brandon.stevens@example.com",
    agent: "Anindy",
  },
  {
    id: 12,
    name: "Megan Richards",
    subject: "need help #2132",
    role: "P. Manager",
    team: "Product",
    status: "Overdue",
    priority: "high",
    age: "28",
    avatar: "https://i.pravatar.cc/150?img=10",
    email: "megan.richards@example.com",
    agent: "Norwin",
  },
  {
    id: 13,
    name: "Oliver Scott",
    subject: "need help #2132",
    role: "S. Manager",
    team: "Security",
    status: "Remaining",
    priority: "urgent",
    age: "37",
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "oliver.scott@example.com",
    agent: "Anindy",
  },
  {
    id: 14,
    name: "Grace Allen",
    subject: "need help #2132",
    role: "M. Specialist",
    team: "Marketing",
    status: "Responded",
    priority: "urgent",
    age: "30",
    avatar: "https://i.pravatar.cc/150?img=16",
    email: "grace.allen@example.com",
    agent: "Norwin",
  },
  {
    id: 15,
    name: "Noah Carter",
    subject: "need help #2132",
    role: "IT Specialist",
    team: "I. Technology",
    status: "Closed",
    priority: "high",
    age: "31",
    avatar: "https://i.pravatar.cc/150?img=15",
    email: "noah.carter@example.com",
    agent: "Anindy",
  },
  {
    id: 16,
    name: "Ava Perez",
    subject: "need help #2132",
    role: "Manager",
    team: "Sales",
    status: "Recent",
    priority: "urgent",
    age: "29",
    avatar: "https://i.pravatar.cc/150?img=20",
    email: "ava.perez@example.com",
    agent: "Norwin",
  },
  {
    id: 17,
    name: "Liam Johnson",
    subject: "need help #2132",
    role: "Data Analyst",
    team: "Analysis",
    status: "Overdue",
    priority: "urgent",
    age: "28",
    avatar: "https://i.pravatar.cc/150?img=33",
    email: "liam.johnson@example.com",
    agent: "Anindy",
  },
  {
    id: 18,
    name: "Sophia Taylor",
    subject: "need help #2132",
    role: "QA Analyst",
    team: "Testing",
    status: "Responded",
    priority: "urgent",
    age: "27",
    avatar: "https://i.pravatar.cc/150?img=29",
    email: "sophia.taylor@example.com",
    agent: "Norwin",
  },
  {
    id: 19,
    name: "Lucas Harris",
    subject: "need help #2132",
    role: "Administrator",
    team: "Information Technology",
    status: "Remaining",
    priority: "high",
    age: "32",
    avatar: "https://i.pravatar.cc/150?img=50",
    email: "lucas.harris@example.com",
    agent: "Anindy",
  },
  {
    id: 20,
    name: "Mia Robinson",
    subject: "need help #2132",
    role: "Coordinator",
    team: "Operations",
    status: "Closed",
    priority: "urgent",
    age: "26",
    avatar: "https://i.pravatar.cc/150?img=45",
    email: "mia.robinson@example.com",
    agent: "Norwin",
  },
];

export { columns, usersDB, statusOptions };
