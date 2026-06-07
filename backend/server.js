import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());

/* ================= MONGODB CONNECTION ================= */

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,
})
.then(() => {
  console.log("MongoDB Connected ✅");
})
.catch((err) => {
  console.log("Mongo Error:", err.message);
});

/* ================= USER SCHEMA ================= */

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    age: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

/* ================= LEAD SCHEMA ================= */

const leadSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);

/* ================= PRODUCT SCHEMA ================= */

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      type: String,
    },

    // ✅ MULTIPLE IMAGES
    images: [String],

    location: {
      type: String,
    },

    price: {
      type: String,
    },

    description: {
      type: String,
    },

    // ✅ DETAILS ARRAY
    details: [[String]],

    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

/* ================= CONTACT SCHEMA ================= */

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

/* ================= REQUIREMENT SCHEMA ================= */

const requirementSchema = new mongoose.Schema(
  {
    requirement: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Requirement = mongoose.model(
  "Requirement",
  requirementSchema
);

/* ================= QUOTE SCHEMA ================= */

const quoteSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Quote = mongoose.model("Quote", quoteSchema);
const quickContactSchema = new mongoose.Schema(
  {
    requirement: String,
    phone: String,
    name: String,
  },
  { timestamps: true }
);

const QuickContact = mongoose.model(
  "QuickContact",
  quickContactSchema
);

/* ================================================= */
/* ================= USER ROUTES =================== */
/* ================================================= */

/* CREATE USER */
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);

    const savedUser = await user.save();

    res.json(savedUser);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

/* GET ALL USERS */
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

/* GET SINGLE USER */
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.json(user);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

/* UPDATE USER */
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

/* DELETE USER */
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

/* ================================================= */
/* ================= LEAD ROUTES =================== */
/* ================================================= */

/* SAVE PHONE LEAD */
app.post("/save-phone", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const newLead = new Lead({
      phone,
    });

    await newLead.save();

    res.json({
      success: true,
      message: "Phone saved successfully ✅",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* GET ALL LEADS */
app.get("/leads", async (req, res) => {
  try {
    const leads = await Lead.find();

    res.json(leads);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

/* ================================================= */
/* ================= PRODUCT ROUTES ================= */
/* ================================================= */

/* ADD PRODUCT */
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.json({
      success: true,
      data: savedProduct,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* GET ALL PRODUCTS */
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find(
    );

    res.json({
      success: true,
      data: products,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* GET SINGLE PRODUCT */
app.get("/products/:slug", async (req, res) => {
  try {
    const product = await Product.find({
      slug: req.params.slug,
    });

    res.json({
      success: true,
      data: product,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* ================================================= */
/* ================= CONTACT ROUTES ================= */
/* ================================================= */

/* SAVE CONTACT FORM */
app.post("/contact", async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newContact = new Contact({
      name,
      phone,
      message,
    });

    await newContact.save();

    res.json({
      success: true,
      message: "Contact form submitted successfully ✅",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* GET ALL CONTACTS */
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.json({
      success: true,
      data: contacts,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* ===================================================== */
/* =============== REQUIREMENT ROUTES ================== */
/* ===================================================== */

/* SAVE REQUIREMENT */
app.post("/requirements", async (req, res) => {
  try {
    const { requirement } = req.body;

    if (!requirement) {
      return res.status(400).json({
        success: false,
        message: "Requirement is required",
      });
    }

    const newRequirement = new Requirement({
      requirement,
    });

    await newRequirement.save();

    res.json({
      success: true,
      message: "Requirement submitted successfully ✅",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* GET ALL REQUIREMENTS */
app.get("/requirements", async (req, res) => {
  try {
    const requirements = await Requirement.find();

    res.json({
      success: true,
      data: requirements,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* ================================================= */
/* ================= QUOTE ROUTES ================== */
/* ================================================= */

/* SAVE QUOTE */
app.post("/quotes", async (req, res) => {
  try {
    const { productName, type, phone } = req.body;

    if (!productName || !type || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newQuote = new Quote({
      productName,
      type,
      phone,
    });

    await newQuote.save();

    res.json({
      success: true,
      message: "Quote request submitted successfully ✅",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* GET ALL QUOTES */
app.get("/quotes", async (req, res) => {
  try {
    const quotes = await Quote.find();

    res.json({
      success: true,
      data: quotes,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.post("/quick-contact", async (req, res) => {
  try {
    const { requirement, phone, name } = req.body;

    // ✅ Validation
    if (!requirement || !phone || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const newContact = new QuickContact({
      requirement,
      phone,
      name,
    });

    await newContact.save();

    res.json({
      success: true,
      message: "Contact saved successfully ✅",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* ================================================= */
/* ================= TEST ROUTE ==================== */
/* ================================================= */

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

/* ================================================= */
/* ================= START SERVER ================== */
/* ================================================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});