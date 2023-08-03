let products = [
    {
      id: 1,
      headerName: "Personal info",
      headerDes: "Please provide your name, email address, and phone number.",
      email: "",
    },
    {
      id: 2,
      headerName: "Select your Plan",
      headerDes: "You have the option of mothly or yearly billing.",
      plans: [
        { id: 1, title: "Arcade", price: 9, isActive: false},
        { id: 2, title: "Advanced", price: 12, isActive: true},
        { id: 3, title: "Pro", price: 15, isActive: false },
      ],
      yearly: {
        isActive: false,
        caption: '2 months free'
      },
    },
    {
      id: 3,
      headerName: "Pick add-ons",
      headerDes: "Add-ons help enhance your gaming experience.",
      addOns: [
        {id: 1, title: 'Online service', caption: 'Access to mulyiplayer games', price: 1, isActive: false},
        {id: 2, title: 'Larger storage', caption: 'Extra 1TB of cloud save', price: 2, isActive: false},
        {id: 3, title: 'Customizable profile', caption: 'Custom theme on your profile', price: 2, isActive: false},
      ],
    },
    {
      id: 4,
      headerName: "Finishing up",
      headerDes: "Double-check everything looks OK before confirming",
    },
  ];
  