# Lighthouse: LLM Catalog Platform

A 2 week Hackathon project with HorizonX and Digital Futures.

## Usage

- **Front-end** -  Accessible at https://df-lighthouse.onrender.com/

- **Back-end** -  Accessible at https://df-hackathon-lighthouse-service.onrender.com/


## Table of Contents

- [Lighthouse: LLM Catalog Platform](#lighthouse-llm-catalog-platform)
  - [Usage](#usage)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Key Features](#key-features)
    - [Target Users](#target-users)
  - [Project Deliverables](#project-deliverables)
    - [1. LLM Matrix](#1-llm-matrix)
    - [2. LLM Catalog](#2-llm-catalog)
    - [Additional Features](#additional-features)
  - [Score Calculation Methodology](#score-calculation-methodology)
    - [Business Readiness](#business-readiness)
    - [Perceived Business Value](#perceived-business-value)
  - [Calculation Formulas](#calculation-formulas)
    - [Business Use:](#business-use)
    - [Employee Use:](#employee-use)
  - [Technology Stack](#technology-stack)
  - [Installation](#installation)
  - [Contributors:](#contributors)

## Overview

**Lighthouse** is a platform designed to provide an extensive catalog of Large Language Models (LLMs) tailored for regulated industries like banking, healthcare, pharmaceuticals, and telecommunications. It helps businesses and governance teams navigate the complex landscape of LLMs, offering insights and evaluations to support informed decision-making.

### Key Features
- **Centralized Repository:** A database of the most popular LLMs with detailed information.
- **Interactive Matrix:** Visualize LLMs based on Business Readiness and Perceived Business Value.
- **Detailed Catalog:** Comprehensive entries for each LLM, including key data such as release dates, creators, parameters, and associated legal issues.

### Target Users
- **Market Researchers**
- **AI Teams**
- **Governance Teams** (risk, tech, legal, compliance)

## Project Deliverables

### 1. LLM Matrix
- **Timeline:** 1-1.5 weeks
- **Page:** Single page with a Gartner-like matrix displaying 6-8 LLMs.
- **Matrix Criteria:**
  - *Business Readiness:* Credibility, Harmfulness, Accuracy, Benchmark Performance.
  - *Perceived Business Value:* Capabilities, Success Stories, Popularity.
- **Interactivity:** Filter matrix by use case and industry.

### 2. LLM Catalog
- **Timeline:** 1-1.5 weeks
- **Pages:**
  - **Main Catalog:** Lists LLMs in a sortable table.
  - **LLM Detail Pages:** Detailed information on each LLM.
- **Design:** Clean, professional, and user-friendly.

### Additional Features
- **User Feedback:** Registered users can leave feedback on LLMs.
- **Admin Capabilities:**
  - Manage LLM entries and feedback.
  - Modify industry selectors and matrix criteria via a UI.

## Score Calculation Methodology

Scores for Business Readiness and Perceived Business Value are calculated by combining scores from the subcategories outlined below. Individual scores for subcategories can be found by selecting datapoints on the matrix.

### Business Readiness
- **Capabilities/Features:** The range of functions and features offered by the LLM.
- **Safety:** The potential for the LLM to produce harmful, dishonest, or biased outputs.
- **Performance:** The precision and correctness (helpfulness) of the LLM's responses as well as performance on industry-standard benchmarks.

### Perceived Business Value
- **Organisation Credibility:** The reputation and trustworthiness of the LLM, including the organization behind it.
- **Known Successes:** Documented cases where the LLM has successfully been applied in a business context.
- **Popularity:** The widespread adoption and usage of the LLM in industries.

## Calculation Formulas

Subcategory scores are weighted differently according to the specified use case of the LLM.

### Business Use:
- **Business Readiness:**
  - Capabilities/Features – 40%
  - Safety – 35%
  - Performance – 25%
- **Perceived Business Value:**
  - Organisation Credibility – 40%
  - Known Successes – 40%
  - Popularity – 20%

### Employee Use:
- **Business Readiness:**
  - Capabilities/Features – 50%
  - Safety – 10%
  - Performance – 40%
- **Perceived Business Value:**
  - Organisation Credibility – 33.3%
  - Known Successes – 33.3%
  - Popularity – 33.3%

## Technology Stack
- **Frontend:** ReactJS, Bootstrap, D3
- **Backend:** NodeJS, Express, Mongoose
- **Database:** MongoDB

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/lighthouse-llm-catalog.git
   cd lighthouse-llm-catalog
      ```

2. Install dependencies for both client and server:

    ```sh
    cd Lighthouse-frontend
    npm install
    cd ../Lighthouse-backend
    npm install
    ```

3. Set up environment variables:

    - Create a `.env.dev` file in the `Lighthouse-backend` directory with the following:

    ```env.dev
    PORT=your_port_number
    HOST=your_host
    DB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
    - Create a `.env` file in the `Lighthouse-frontend` directory with the following:
    ```env
    VITE_API_URL=your_api_url
    ```
  

4. Start the development servers:

    ```sh
    cd Lighthouse-backend
    npm run start
    cd ../Lighthouse-frontend
    npm run dev
    ```

## Contributors: 

- Kenen D’Souza - Software Engineer https://github.com/kenenx
- Matthew Fricker - Data Analyst https://github.com/MatthewFricker
- Ikram Zakaria - Data Engineer https://github.com/Ikram-Zak 
- Ben Wierszycki - Data Engineer https://github.com/BenWierszycki
