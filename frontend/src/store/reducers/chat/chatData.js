const chatData = [
    {
        id: 1,
        name: "Alex Dolgove",
        thumb: "https://randomuser.me/api/portraits/thumb/men/1.jpg",
        recent: false,
        time: '4:14 AM',
        excerpt: 'Okay',
        chatHistory: [
            {
                0: {
                    from: ["Tom got a small piece of pie."],
                    to: [
                        "I'd rather be a bird than a fish.",
                        "They got there early, and they got really good seats."
                    ]
                },
                1:{
                    from: [
                        "If I don’t like something, I’ll stay away from it.",
                        "I want more detailed information."
                    ],
                    to: ["We need to rent a room for our party."]
                }
            }
        ]
    },
    {
        id: 2,
        name: "Domnic Brown",
        thumb: "https://randomuser.me/api/portraits/thumb/men/2.jpg",
        recent: true,
        time: '9:04 PM',        
        excerpt: 'Thank you',
        chatHistory: [
            {
                0: {
                    from: ["The sky is clear", "How was the math test?"],
                    to: ["She always speaks to him in a loud voice."]
                },
                1: {
                    from: [
                        "The memory we used to share is no longer coherent.",
                        "The mysterious diary records the voice.",
                        "The old apple revels in its authority."
                    ],
                    to: ["Please wait outside of the house."]
                }
            }
        ]
    },
    {
        id: 3,
        name: "Domnic Harris",
        thumb: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
        recent: false,
        time: '2:14 AM',        
        excerpt: 'Hello krish!',
        chatHistory: [
            {
                0: {
                    from: ["Tom got a small piece of pie."],
                    to: [
                        "I'd rather be a bird than a fish.",
                        "They got there early, and they got really good seats."
                    ]
                },
                1: {
                    from: [
                        "If I don’t like something, I’ll stay away from it.",
                        "I want more detailed information."
                    ],
                    to: ["We need to rent a room for our party."]
                }
            }
        ]
    },
    {
        id: 4,
        name: "Garry Sobars",
        thumb: "https://randomuser.me/api/portraits/thumb/men/4.jpg",
        recent: true,
        time: 'Yesterday',        
        excerpt: 'Will connect you',
        chatHistory: [
            {
                0: {
                    from: ["The sky is clear", "How was the math test?"],
                    to: ["She always speaks to him in a loud voice."]
                },
                1: {
                    from: [
                        "The memory we used to share is no longer coherent.",
                        "The mysterious diary records the voice.",
                        "The old apple revels in its authority."
                    ],
                    to: ["Please wait outside of the house."]
                }
            }
        ]
    },
    {
        id: 5,
        name: "Jeson Born",
        thumb: "https://randomuser.me/api/portraits/thumb/men/5.jpg",
        recent: true,
        time: 'Friday',        
        excerpt: 'Thank you',
        chatHistory: [
            {
                0: {
                    from: ["Tom got a small piece of pie."],
                    to: [
                        "I'd rather be a bird than a fish.",
                        "They got there early, and they got really good seats."
                    ]
                },
                1: {
                    from: [
                        "If I don’t like something, I’ll stay away from it.",
                        "I want more detailed information."
                    ],
                    to: ["We need to rent a room for our party."]
                }
            }
        ]
    },
    {
        id: 6,
        name: "Jimmy Jo",
        thumb: "https://randomuser.me/api/portraits/thumb/men/6.jpg",
        recent: false,
        time: 'Thrusday',        
        excerpt: 'Okay',
        chatHistory: [
            {
                0: {
                    from: ["The sky is clear", "How was the math test?"],
                    to: ["She always speaks to him in a loud voice."]
                },
                1: {
                    from: [
                        "The memory we used to share is no longer coherent.",
                        "The mysterious diary records the voice.",
                        "The old apple revels in its authority."
                    ],
                    to: ["Please wait outside of the house."]
                }
            }
        ]
    },
    {
        id: 7,
        name: "John Smith",
        thumb: "https://randomuser.me/api/portraits/thumb/men/7.jpg",
        recent: true,
        time: 'Thrusday',        
        excerpt: 'Who you are?',
        chatHistory: [
            {
                0: {
                    from: ["Tom got a small piece of pie."],
                    to: [
                        "I'd rather be a bird than a fish.",
                        "They got there early, and they got really good seats."
                    ]
                },
                1: {
                    from: [
                        "If I don’t like something, I’ll stay away from it.",
                        "I want more detailed information."
                    ],
                    to: ["We need to rent a room for our party."]
                }
            }
        ]
    },
    {
        id: 8,
        name: "Kadir M",
        thumb: "https://randomuser.me/api/portraits/thumb/men/8.jpg",
        recent: false,
        time: 'Tuesday',        
        excerpt: 'Welcome',
        chatHistory: [
            {
                0: {
                    from: ["The sky is clear", "How was the math test?"],
                    to: ["She always speaks to him in a loud voice."]
                },
                1: {
                    from: [
                        "The memory we used to share is no longer coherent.",
                        "The mysterious diary records the voice.",
                        "The old apple revels in its authority."
                    ],
                    to: ["Please wait outside of the house."]
                }
            }
        ]
    },
    {
        id: 9,
        name: "Jimmy Jon",
        thumb: "https://randomuser.me/api/portraits/thumb/men/9.jpg",
        recent: false,
        time: '',        
        excerpt: 'Enjoy!!',
        chatHistory: [
            {
                0: {
                    from: ["Tom got a small piece of pie."],
                    to: [
                        "I'd rather be a bird than a fish.",
                        "They got there early, and they got really good seats."
                    ]
                },
                1: {
                    from: [
                        "If I don’t like something, I’ll stay away from it.",
                        "I want more detailed information."
                    ],
                    to: ["We need to rent a room for our party."]
                }
            }
        ]
    },
    {
        id: 10,
        name: "Stella Johnson",
        thumb: "https://randomuser.me/api/portraits/thumb/men/10.jpg",
        recent: false,
        time: '',        
        excerpt: 'Okay',
        chatHistory: [
            {
                0: {
                    from: ["The sky is clear", "How was the math test?"],
                    to: ["She always speaks to him in a loud voice."]
                },
                1: {
                    from: [
                        "The memory we used to share is no longer coherent.",
                        "The mysterious diary records the voice.",
                        "The old apple revels in its authority."
                    ],
                    to: ["Please wait outside of the house."]
                }
            }
        ]
   }
];

export default chatData;
