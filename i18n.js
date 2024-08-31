import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          site: {
            title: "Welcome to JOBS",
            subheading: "Your Dream Job is here",
          },
          search: { placeholder: "Enter your search term" },
          login: {
            login: "Login",
            logout: "Logout",
            register: "Register",
            registerForUser: "Job Seeker",
            registerForRecruiter: "Recruiter",
          },
          footer: {
            copyright:
              "JOBS is provided as a service to its customers, All right reserved, copyright  (c) 2024",
          },
          user: { type: "Role" },

          job: {
            type: "Type",
            title: "Full Time Jobs",
            parttime: "Part Time Jobs",
            internship: "Internship Jobs",
            freelanceJobs: "Freelancer jobs",
            language: "Languages",
            location: "Location",
            status: "Status",
            workType: "Work Type",
            details: "Job Description",
            extra: "Other Details",
            benefits: "Benefits",
            skills: "Skills Required",
            create: {
              title: "Job Title",
              RemoteWork: "Remote Job",
              type: "Position Type",
              priority: "Priority",
              location: "Location",
              program: "Industry",
              specialization: "Area of Specialiation",
              skills: "Skills Required",
              exp: {
                min: " Min Experience Required",
                max: "Max Experience Required",
              },
              salary: {
                type: "Remuneration",
                min: "Starting",
                max: "To",
                currency: "Currency",
              },
              languages: "Languages",
              details: "Job Description",
              benefits: "Benefits Offered",
              extras: "Extra Information (Non-Mandatory)",
            },
          },
          skills: "Skills Required",
          details: "Extra Information",
          benefits: "Extra Information",
          jobcard: {
            viewmore: "More",
            loginToApply: "  Apply  ",
            postedOn: "Posted On:",
            companyName: "Company",
            viewdetails: "Details",
          },
          registerAsRecruiter: {
            body: "Please send your details at support@midasminds.in",
            header: "Register",
            cancel: "Cancel",
            saveChanges: "Save changes",
          },
          registerAsUserPopup: {
            body: "Please reachout to Midasminds portal team",
            bodyForgotPassword:
              "Please reachout to Midasminds portal team",

            header: "Redirecting...",
          },
          cancel: "Cancel",
          date: { createdOn: "Creation Date" },
          name: {
            first: "First Name",
            middle: "Middle Name",
            last: "Last Name",
          },
          email: "Email",
          mobile: "Mobile",
          sendInvite: "Send invite",
          viewdetails: "View Details",
          languages: "Language Fluency",
          commonInterestsName: "Common interest",
          inviteStatus: "Status",
          currentLocation: "Location",
          action: "Action",

          jobdetails: {
            editjob: "Edit Job",
            viewApplications: "View Application",
          },
          jobstatus: { applied: "Applied" },
          responseDescription: {
            somethingWentWrong: "Something went wrong, please try again",
            notFound: "Not Found",
            unprocessableEntity: "Unprocessable Entity",
            unauthorized: "Unauthorized Access",
            forbidden: "Forbidden",
            internalServerError: "Internal Server Error",
            messageSent: "Mail Sent Successfully",
            CREATED: "Job Posting created successfully",
            UPDATED: "Job Posting has been updated successfully",
            APPLIED: "Your application has been sent",
            loggedIn: "Welcome to JOBS",
            emailSent: "We have sent link to your email to reset password",
            skillsUpdated: "Skills has been updated successfully",
            updateEducation: "Education updated successfully",
            interestUpdated: "Interests updated successfully",
            updateLanguage: "Language updated successfully",
            emailNotExist: "Email id does not exist",
            forgotPasswordsuccess:
              "We have sent you link to reset your password...",
            updatePasswordsuccess: "Password Update successfully.",

            updatePassword: "Please login your password got reset",
          },
          application: {
            cs: { select: "Select a resume to apply" },
          },
          jobcreate: {
            welcome_message:
              "Please edit your profile information, the information helps the system to suggest better jobs and increases your chances of getting response",
            "College Name": "Institution/College Studied in",
            Skills: "Skill Acquired",
            interests: "Professional Interests",
            languages: "Languages Known",
            program: "Area of Study",
            specialization: "Specialization",
            startdate: "Starting Year",
            enddate: "Year of Passing",
            save_education: "Save Education",
          },
          appliedList: {
            name: "Name",
            comment: "Comment",
            resume: "Resume",
            status: "Status",
            appliedOn: "Applied on",
            Note: "Notes",
            Action: "Action",
          },
          suggestedList: {
            name: "Name",
            commonInterests: "Common Interests",
            commonInterestsCount: "Common Interests Count",
            inviteStatus: "Status",
            appliedOn: "Applied on",
            action: "Action",
          },
          company: {
            name: "Company Name",
            intro: "Company intro",
            about: "Company about",
            location: "Company location",
            serial: "Serial no.",
            logo: "Logo",
            createdOn: "Created on",
            action: "Action",
            view: "View",
            edit: "Edit",
          },
        },
      },
    },
    hi: {
      translation: {
        site: {
          title: "आपका करियर की सही शरुआत ",
          subheading: "१००० से जयादा नौकरी उपलब्ध!",
        },
        search: { placeholder: "Enter your search term" },
      },
    },
  });

export default i18n;
