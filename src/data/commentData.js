export const initialComments = [
    {
        id: 1,
        text: "This is the first comment 😊",
        owner: "John Doe",
        replies: [
            {
                id: 2,
                text: "This is a reply to the first comment 👍",
                owner: "Jane Smith",
                replies: [
                    {
                        id: 3,
                        text: "This is a nested reply 🤔",
                        owner: "Alex Johnson",
                        replies: [],
                    },
                ],
            },
            {
                id: 4,
                text: "Another reply to the first comment 😄",
                owner: "Mike Wilson",
                replies: [],
            },
        ],
    },
    {
        id: 5,
        text: "This is a second main comment 🤝",
        owner: "Sarah Brown",
        replies: [
            {
                id: 6,
                text: "A reply to the second comment 👏",
                owner: "Tom Davis",
                replies: [],
            },
        ],
    },
];
