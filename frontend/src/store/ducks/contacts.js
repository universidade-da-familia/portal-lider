export const Types = {
  ADD_CONTACT: "contacts/ADD_CONTACT",
  UPDATE_CONTACT: "contacts/UPDATE_CONTACT",
  CONTACT_DETAILS: "contacts/CONTACT_DETAILS",
  EDIT_CONTACT: "contacts/EDIT_CONTACT",
  SET_VISIBILITY_FILTER: "contacts/SET_VISIBILITY_FILTER",
  FILTER_CONTACT: "contacts/FILTER_CONTACT",
  TOGGLE_STARRED_CONTACT: "contacts/TOGGLE_STARRED_CONTACT",
  DELETE_CONTACT: "contacts/DELETE_CONTACT",
  SHOW_ALL: "contacts/SHOW_ALL",
  FREQUENT_CONTACT: "contacts/FREQUENT_CONTACT",
  STARRED_CONTACT: "contacts/STARRED_CONTACT",
  ENGINEERING_DEPARTMENT_CONTACT: "contacts/ENGINEERING_DEPARTMENT_CONTACT",
  SALES_DEPARTMENT_CONTACT: "contacts/Sales",
  SUPPORT_DEPARTMENT_CONTACT: "contacts/SUPPORT_DEPARTMENT_CONTACT",
  SEARCH_CONTACT: "contacts/SEARCH_CONTACT",
  DELETED_CONTACT: "contacts/DELETED_CONTACT"
};

const INITIAL_STATE = {
  contactList: [
    {
      id: 0,
      firstname: "Stephani",
      lastname: "Dalling",
      image: "https://randomuser.me/api/portraits/med/men/0.jpg",
      department: "Sales",
      company: "Rhybox",
      phone: "131-556-6770",
      email: "sdalling0@blogtalkradio.com",
      address: "391 Quincy Crossing",
      notes: "Future-proofed fault-tolerant leverage",
      frequentlycontacted: false,
      starred: true,
      deleted: true
    },
    {
      id: 1,
      firstname: "Amye",
      lastname: "Guage",
      image: "https://randomuser.me/api/portraits/med/men/1.jpg",
      department: "Sales",
      company: "Trilith",
      phone: "816-459-2973",
      email: "aguage1@patch.com",
      address: "43 Monument Parkway",
      notes: "Open-source disintermediate productivity",
      frequentlycontacted: true,
      starred: true,
      deleted: true
    },
    {
      id: 2,
      firstname: "Alejandro",
      lastname: "Ealles",
      image: "https://randomuser.me/api/portraits/med/men/2.jpg",
      department: "Support",
      company: "Fiveclub",
      phone: "906-868-3447",
      email: "aealles2@pbs.org",
      address: "8 Dunning Crossing",
      notes: "Reverse-engineered radical attitude",
      frequentlycontacted: false,
      starred: false,
      deleted: false
    },
    {
      id: 3,
      firstname: "Cissy",
      lastname: "Mawford",
      image: "https://randomuser.me/api/portraits/med/men/3.jpg",
      department: "Engineering",
      company: "Fivebridge",
      phone: "972-605-5182",
      email: "cmawford3@phoca.cz",
      address: "771 Melody Hill",
      notes: "Pre-emptive explicit hardware",
      frequentlycontacted: true,
      starred: false,
      deleted: false
    },
    {
      id: 4,
      firstname: "Orly",
      lastname: "Brennand",
      image: "https://randomuser.me/api/portraits/med/men/4.jpg",
      department: "Support",
      company: "Yata",
      phone: "863-939-6586",
      email: "obrennand4@elpais.com",
      address: "43016 Vidon Parkway",
      notes: "Profound tangible attitude",
      frequentlycontacted: false,
      starred: true,
      deleted: true
    },
    {
      id: 5,
      firstname: "Rich",
      lastname: "Terram",
      image: "https://randomuser.me/api/portraits/med/men/5.jpg",
      department: "Engineering",
      company: "Eire",
      phone: "106-632-6145",
      email: "rterram5@plala.or.jp",
      address: "12 Main Circle",
      notes: "Enhanced global complexity",
      frequentlycontacted: false,
      starred: false,
      deleted: false
    },
    {
      id: 6,
      firstname: "Lynne",
      lastname: "Marfe",
      image: "https://randomuser.me/api/portraits/med/men/6.jpg",
      department: "Support",
      company: "Meemm",
      phone: "230-568-0483",
      email: "lmarfe6@cyberchimps.com",
      address: "10250 6th Plaza",
      notes: "Operative background methodology",
      frequentlycontacted: true,
      starred: false,
      deleted: true
    },
    {
      id: 7,
      firstname: "Frederique",
      lastname: "Gotch",
      image: "https://randomuser.me/api/portraits/med/men/7.jpg",
      department: "Support",
      company: "Fadeo",
      phone: "478-752-2538",
      email: "fgotch7@issuu.com",
      address: "1 Washington Court",
      notes: "Digitized grid-enabled hardware",
      frequentlycontacted: false,
      starred: false,
      deleted: true
    },
    {
      id: 8,
      firstname: "Godart",
      lastname: "Sibson",
      image: "https://randomuser.me/api/portraits/med/men/8.jpg",
      department: "Sales",
      company: "Yamia",
      phone: "745-580-2851",
      email: "gsibson8@sourceforge.net",
      address: "96 Muir Court",
      notes: "Extended maximized support",
      frequentlycontacted: true,
      starred: true,
      deleted: true
    },
    {
      id: 9,
      firstname: "Costanza",
      lastname: "Torn",
      image: "https://randomuser.me/api/portraits/med/men/9.jpg",
      department: "Engineering",
      company: "Lazz",
      phone: "659-856-6185",
      email: "ctorn9@wordpress.org",
      address: "7 Fieldstone Court",
      notes: "Pre-emptive mission-critical installation",
      frequentlycontacted: false,
      starred: true,
      deleted: true
    },
    {
      id: 10,
      firstname: "Timmie",
      lastname: "Iacobetto",
      image: "https://randomuser.me/api/portraits/med/men/10.jpg",
      department: "Support",
      company: "Leexo",
      phone: "906-260-2554",
      email: "tiacobettoa@vkontakte.ru",
      address: "76066 Anderson Junction",
      notes: "Centralized upward-trending benchmark",
      frequentlycontacted: false,
      starred: false,
      deleted: true
    },
    {
      id: 11,
      firstname: "Renaud",
      lastname: "Dumbreck",
      image: "https://randomuser.me/api/portraits/med/men/11.jpg",
      department: "Engineering",
      company: "Nlounge",
      phone: "230-466-8068",
      email: "rdumbreckb@netscape.com",
      address: "57087 Amoth Avenue",
      notes: "Expanded analyzing productivity",
      frequentlycontacted: false,
      starred: false,
      deleted: true
    },
    {
      id: 12,
      firstname: "Moyna",
      lastname: "Atwater",
      image: "https://randomuser.me/api/portraits/med/men/12.jpg",
      department: "Support",
      company: "Demimbu",
      phone: "529-102-0661",
      email: "matwaterc@cocolog-nifty.com",
      address: "7115 Mcguire Street",
      notes: "Optional secondary parallelism",
      frequentlycontacted: true,
      starred: false,
      deleted: false
    },
    {
      id: 13,
      firstname: "Caron",
      lastname: "Rosevear",
      image: "https://randomuser.me/api/portraits/med/men/13.jpg",
      department: "Sales",
      company: "Flashset",
      phone: "926-458-8192",
      email: "croseveard@accuweather.com",
      address: "97784 Cordelia Junction",
      notes: "Streamlined solution-oriented concept",
      frequentlycontacted: true,
      starred: true,
      deleted: false
    },
    {
      id: 14,
      firstname: "Lamont",
      lastname: "Happert",
      image: "https://randomuser.me/api/portraits/med/men/14.jpg",
      department: "Engineering",
      company: "Cogilith",
      phone: "680-411-7479",
      email: "lhapperte@youtu.be",
      address: "3159 Gateway Plaza",
      notes: "Switchable eco-centric hardware",
      frequentlycontacted: true,
      starred: true,
      deleted: false
    },
    {
      id: 15,
      firstname: "Carlee",
      lastname: "Steptowe",
      image: "https://randomuser.me/api/portraits/med/men/15.jpg",
      department: "Sales",
      company: "Teklist",
      phone: "119-385-2710",
      email: "csteptowef@harvard.edu",
      address: "4 Gale Plaza",
      notes: "Face to face upward-trending moderator",
      frequentlycontacted: false,
      starred: true,
      deleted: false
    },
    {
      id: 16,
      firstname: "Alvira",
      lastname: "Crocombe",
      image: "https://randomuser.me/api/portraits/med/women/16.jpg",
      department: "Support",
      company: "Eidel",
      phone: "406-455-3625",
      email: "acrocombeg@qq.com",
      address: "72814 Bayside Place",
      notes: "De-engineered bifurcated installation",
      frequentlycontacted: false,
      starred: false,
      deleted: false
    },
    {
      id: 17,
      firstname: "Bartlet",
      lastname: "Ruter",
      image: "https://randomuser.me/api/portraits/med/women/17.jpg",
      department: "Sales",
      company: "Twitterbeat",
      phone: "186-544-2732",
      email: "bruterh@mediafire.com",
      address: "2 Lotheville Hill",
      notes: "Robust dedicated database",
      frequentlycontacted: true,
      starred: true,
      deleted: false
    },
    {
      id: 18,
      firstname: "Elizabeth",
      lastname: "Swainger",
      image: "https://randomuser.me/api/portraits/med/women/18.jpg",
      department: "Support",
      company: "Vimbo",
      phone: "680-727-9853",
      email: "eswaingeri@dot.gov",
      address: "5540 Mcguire Terrace",
      notes: "Inverse motivating hardware",
      frequentlycontacted: true,
      starred: true,
      deleted: false
    },
    {
      id: 19,
      firstname: "Karyn",
      lastname: "Bog",
      image: "https://randomuser.me/api/portraits/med/women/19.jpg",
      department: "Sales",
      company: "Voomm",
      phone: "510-268-0203",
      email: "kbogj@google.ru",
      address: "13 Debs Trail",
      notes: "Compatible optimizing standardization",
      frequentlycontacted: false,
      starred: false,
      deleted: true
    },
    {
      id: 20,
      firstname: "Cyrus",
      lastname: "Mardall",
      image: "https://randomuser.me/api/portraits/med/women/20.jpg",
      department: "Support",
      company: "Mybuzz",
      phone: "686-272-1165",
      email: "cmardallk@csmonitor.com",
      address: "3971 Grover Way",
      notes: "Focused grid-enabled system engine",
      frequentlycontacted: false,
      starred: true,
      deleted: true
    },
    {
      id: 21,
      firstname: "Morton",
      lastname: "Giorgione",
      image: "https://randomuser.me/api/portraits/med/women/21.jpg",
      department: "Support",
      company: "Oyondu",
      phone: "844-161-7714",
      email: "mgiorgionel@nsw.gov.au",
      address: "78 Forest Run Pass",
      notes: "Centralized interactive architecture",
      frequentlycontacted: true,
      starred: false,
      deleted: false
    },
    {
      id: 22,
      firstname: "Joanne",
      lastname: "Messenbird",
      image: "https://randomuser.me/api/portraits/med/women/22.jpg",
      department: "Engineering",
      company: "Meevee",
      phone: "337-720-5581",
      email: "jmessenbirdm@de.vu",
      address: "6 Southridge Pass",
      notes: "Triple-buffered hybrid structure",
      frequentlycontacted: true,
      starred: false,
      deleted: true
    },
    {
      id: 23,
      firstname: "Domenic",
      lastname: "Standish",
      image: "https://randomuser.me/api/portraits/med/women/23.jpg",
      department: "Sales",
      company: "Zoomcast",
      phone: "170-860-1010",
      email: "dstandishn@ed.gov",
      address: "293 Laurel Park",
      notes: "Intuitive interactive portal",
      frequentlycontacted: true,
      starred: false,
      deleted: true
    },
    {
      id: 24,
      firstname: "Gerta",
      lastname: "Ricci",
      image: "https://randomuser.me/api/portraits/med/women/24.jpg",
      department: "Business Development",
      company: "Twitterworks",
      phone: "460-933-1134",
      email: "griccio@businessinsider.com",
      address: "927 Oakridge Pass",
      notes: "Virtual zero tolerance protocol",
      frequentlycontacted: false,
      starred: false,
      deleted: true
    },
    {
      id: 25,
      firstname: "Tabitha",
      lastname: "Syres",
      image: "https://randomuser.me/api/portraits/med/women/25.jpg",
      department: "Sales",
      company: "Leexo",
      phone: "292-707-2376",
      email: "tsyresp@ycombinator.com",
      address: "975 Oakridge Point",
      notes: "Diverse radical function",
      frequentlycontacted: true,
      starred: true,
      deleted: true
    },
    {
      id: 26,
      firstname: "Gherardo",
      lastname: "Stiell",
      image: "https://randomuser.me/api/portraits/med/women/26.jpg",
      department: "Business Development",
      company: "Yombu",
      phone: "157-757-6052",
      email: "gstiellq@cnn.com",
      address: "5 Oak Point",
      notes: "Integrated homogeneous hub",
      frequentlycontacted: false,
      starred: false,
      deleted: true
    },
    {
      id: 27,
      firstname: "Yul",
      lastname: "Boone",
      image: "https://randomuser.me/api/portraits/med/women/27.jpg",
      department: "Sales",
      company: "Jayo",
      phone: "709-683-1315",
      email: "ybooner@go.com",
      address: "5720 Arapahoe Parkway",
      notes: "Digitized 6th generation extranet",
      frequentlycontacted: false,
      starred: true,
      deleted: false
    },
    {
      id: 28,
      firstname: "Jarret",
      lastname: "Gerasch",
      image: "https://randomuser.me/api/portraits/med/women/28.jpg",
      department: "Engineering",
      company: "Realcube",
      phone: "207-405-3755",
      email: "jgeraschs@sfgate.com",
      address: "225 Morrow Junction",
      notes: "Balanced bottom-line migration",
      frequentlycontacted: true,
      starred: true,
      deleted: false
    },
    {
      id: 29,
      firstname: "Rubetta",
      lastname: "Kline",
      image: "https://randomuser.me/api/portraits/med/women/29.jpg",
      department: "Sales",
      company: "Dabshots",
      phone: "456-639-5445",
      email: "rklinet@linkedin.com",
      address: "043 Barnett Drive",
      notes: "Managed zero tolerance instruction set",
      frequentlycontacted: false,
      starred: false,
      deleted: false
    }
  ]
};

export default function contacts(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_CONTACT:
      return [
        ...state,
        {
          id: action.payload.id,
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          image: action.payload.image,
          department: action.payload.department,
          company: action.payload.company,
          phone: action.payload.phone,
          email: action.payload.email,
          address: action.payload.address,
          notes: action.payload.notes,
          frequentlycontacted: false,
          starred: false,
          deleted: false
        }
      ];
    case Types.UPDATE_CONTACT:
      return state.map(contact =>
        contact.id === action.payload.id
          ? { ...contact, [action.payload.field]: action.payload.value }
          : contact
      );
    case Types.TOGGLE_STARRED_CONTACT:
      return state.map(contact =>
        contact.id === action.payload.id
          ? { ...contact, starred: !contact.starred }
          : contact
      );
    case Types.DELETE_CONTACT:
      return state.map(contact =>
        contact.id === action.payload.id
          ? { ...contact, deleted: !contact.deleted }
          : contact
      );
    case Types.CONTACT_DETAILS:
      return action.payload.id;
    case Types.FILTER_CONTACT:
      return action.payload;
    case Types.SET_VISIBILITY_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
}

export const Creators = {
  addContact: (
    id,
    firstname,
    lastname,
    department,
    company,
    phone,
    email,
    address,
    notes
  ) => ({
    type: Types.ADD_CONTACT,
    payload: {
      id: id++,
      firstname: firstname ? firstname : "",
      lastname: lastname ? lastname : "",
      image: "https://randomuser.me/api/portraits/thumb/men/" + id + ".jpg",
      department: department ? department : "",
      company: company ? company : "",
      phone: phone ? phone : "",
      email: email ? email : "",
      address: address ? address : "",
      notes: notes ? notes : ""
    }
  }),

  updateContact: (id, field, value) => ({
    type: Types.UPDATE_CONTACT,
    payload: {
      id: id,
      field: field,
      value: value
    }
  }),

  contactDetails: id => ({
    type: Types.CONTACT_DETAILS,
    payload: {
      id
    }
  }),

  setEditContactFlag: flag => ({
    type: Types.ADD_CONTACT,
    payload: {
      flag
    }
  }),

  setVisibilityFilter: filter => ({
    type: Types.SET_VISIBILITY_FILTER,
    payload: {
      filter
    }
  }),

  contactsSearch: searchTerm => ({
    type: Types.FILTER_CONTACT,
    payload: {
      searchTerm
    }
  }),

  toggleStarredContact: id => ({
    type: Types.TOGGLE_STARRED_CONTACT,
    payload: {
      id
    }
  }),

  deleteContact: id => ({
    type: Types.DELETE_CONTACT,
    payload: {
      id
    }
  })
};
