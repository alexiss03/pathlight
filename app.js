const USERS_STORAGE_KEY = "pathlight-bible-users-v1";
const SESSION_STORAGE_KEY = "pathlight-bible-session-v1";
const APP_STATE_PREFIX = "pathlight-bible-state-v1:";
const ANNOUNCEMENTS_STORAGE_KEY = "pathlight-bible-announcements-v1";
const GUEST_USER_ID = "guest-local";

const readingPlan = [
  { id: 1, day: 1, reference: "Psalm 1", theme: "Delight in God's Word", prompt: "What fruit comes from meditating on Scripture?" },
  { id: 2, day: 2, reference: "Matthew 6:25-34", theme: "Trust Over Anxiety", prompt: "What concern can you release to God today?" },
  { id: 3, day: 3, reference: "John 15:1-11", theme: "Abide in Christ", prompt: "What helps you stay connected to Jesus?" },
  { id: 4, day: 4, reference: "Romans 8:1-11", theme: "Life in the Spirit", prompt: "How does grace reshape your identity?" },
  { id: 5, day: 5, reference: "Galatians 5:16-26", theme: "Fruit of the Spirit", prompt: "Which fruit is God growing in you now?" },
  { id: 6, day: 6, reference: "Ephesians 2:1-10", theme: "Saved by Grace", prompt: "How has God changed your story?" },
  { id: 7, day: 7, reference: "Philippians 4:4-9", theme: "Peace in Practice", prompt: "What can you turn into prayer today?" },
  { id: 8, day: 8, reference: "Colossians 3:12-17", theme: "Clothed in Love", prompt: "Where can you choose compassion this week?" },
  { id: 9, day: 9, reference: "Hebrews 12:1-3", theme: "Endurance", prompt: "What distraction should you lay aside?" },
  { id: 10, day: 10, reference: "James 1:2-8", theme: "Wisdom in Trials", prompt: "How can this trial mature your faith?" },
  { id: 11, day: 11, reference: "1 Peter 5:6-11", theme: "Humble Dependence", prompt: "What burden can you cast on the Lord?" },
  { id: 12, day: 12, reference: "1 John 4:7-12", theme: "Love One Another", prompt: "How does receiving God's love shape your actions?" },
  { id: 13, day: 13, reference: "2 Timothy 3:14-17", theme: "Scripture's Power", prompt: "What part of Scripture is teaching you now?" },
  { id: 14, day: 14, reference: "Micah 6:6-8", theme: "Walk Humbly", prompt: "What does justice, mercy, and humility look like today?" }
];

const verses = [
  { reference: "Joshua 1:9", topic: "Courage", text: "Be strong and of a good courage... for the Lord thy God is with thee whithersoever thou goest." },
  { reference: "Psalm 27:1", topic: "Confidence", text: "The Lord is my light and my salvation; whom shall I fear?" },
  { reference: "Proverbs 3:5-6", topic: "Guidance", text: "Trust in the Lord with all thine heart... and he shall direct thy paths." },
  { reference: "Isaiah 40:31", topic: "Strength", text: "They that wait upon the Lord shall renew their strength." },
  { reference: "Matthew 11:28", topic: "Rest", text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest." },
  { reference: "John 8:12", topic: "Light", text: "I am the light of the world: he that followeth me shall not walk in darkness." },
  { reference: "Romans 12:2", topic: "Transformation", text: "Be ye transformed by the renewing of your mind." },
  { reference: "Romans 8:28", topic: "Purpose", text: "All things work together for good to them that love God." },
  { reference: "2 Corinthians 5:17", topic: "New Life", text: "If any man be in Christ, he is a new creature." },
  { reference: "Galatians 2:20", topic: "Identity", text: "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me." },
  { reference: "Philippians 4:6-7", topic: "Peace", text: "Be careful for nothing... and the peace of God... shall keep your hearts and minds." },
  { reference: "Philippians 4:13", topic: "Strength", text: "I can do all things through Christ which strengtheneth me." },
  { reference: "Hebrews 4:16", topic: "Prayer", text: "Let us therefore come boldly unto the throne of grace." },
  { reference: "James 1:5", topic: "Wisdom", text: "If any of you lack wisdom, let him ask of God." },
  { reference: "1 John 1:9", topic: "Forgiveness", text: "If we confess our sins, he is faithful and just to forgive us our sins." },
  { reference: "1 John 4:19", topic: "Love", text: "We love him, because he first loved us." }
];

const verseInsightMap = {
  "Joshua 1:9": "Courage grows when you remember God is present before you take the first step.",
  "Psalm 27:1": "Fear loses power when your identity is anchored in God's protection and salvation.",
  "Proverbs 3:5-6": "Trust begins where control ends. Surrender your plans and follow God's direction.",
  "Isaiah 40:31": "Waiting on God is active faith; He renews strength for the next assignment.",
  "Matthew 11:28": "Jesus invites honest weakness. Rest is received, not achieved.",
  "John 8:12": "Following Christ gives clarity for daily decisions and freedom from spiritual confusion.",
  "Romans 12:2": "Transformation starts in your thinking; truth reshapes habits and choices.",
  "Romans 8:28": "God can redeem what you cannot explain and weave it into purpose.",
  "2 Corinthians 5:17": "In Christ your past is not your identity; you can live from new creation reality.",
  "Galatians 2:20": "The Christian life is not self-powered; Christ's life in you is the source of change.",
  "Philippians 4:6-7": "Prayer turns anxiety into trust and guards your inner life with God's peace.",
  "Philippians 4:13": "Strength in Christ means faithfulness in every assignment, not self-sufficiency.",
  "Hebrews 4:16": "Grace is available now. You can approach God with confidence in any season.",
  "James 1:5": "Godly wisdom is requested in prayer and applied in obedience.",
  "1 John 1:9": "Confession restores fellowship and removes the burden of hidden sin.",
  "1 John 4:19": "Love for others flows naturally when you receive God's love first."
};

const bibleBooks = [
  ["Genesis", 50], ["Exodus", 40], ["Leviticus", 27], ["Numbers", 36], ["Deuteronomy", 34],
  ["Joshua", 24], ["Judges", 21], ["Ruth", 4], ["1 Samuel", 31], ["2 Samuel", 24],
  ["1 Kings", 22], ["2 Kings", 25], ["1 Chronicles", 29], ["2 Chronicles", 36], ["Ezra", 10],
  ["Nehemiah", 13], ["Esther", 10], ["Job", 42], ["Psalms", 150], ["Proverbs", 31],
  ["Ecclesiastes", 12], ["Song of Solomon", 8], ["Isaiah", 66], ["Jeremiah", 52], ["Lamentations", 5],
  ["Ezekiel", 48], ["Daniel", 12], ["Hosea", 14], ["Joel", 3], ["Amos", 9],
  ["Obadiah", 1], ["Jonah", 4], ["Micah", 7], ["Nahum", 3], ["Habakkuk", 3],
  ["Zephaniah", 3], ["Haggai", 2], ["Zechariah", 14], ["Malachi", 4], ["Matthew", 28],
  ["Mark", 16], ["Luke", 24], ["John", 21], ["Acts", 28], ["Romans", 16],
  ["1 Corinthians", 16], ["2 Corinthians", 13], ["Galatians", 6], ["Ephesians", 6], ["Philippians", 4],
  ["Colossians", 4], ["1 Thessalonians", 5], ["2 Thessalonians", 3], ["1 Timothy", 6], ["2 Timothy", 4],
  ["Titus", 3], ["Philemon", 1], ["Hebrews", 13], ["James", 5], ["1 Peter", 5],
  ["2 Peter", 3], ["1 John", 5], ["2 John", 1], ["3 John", 1], ["Jude", 1],
  ["Revelation", 22]
].map(([name, chapters]) => ({ name, chapters }));

const DEFAULT_BIBLE_READER = {
  book: "Genesis",
  chapter: 1,
  translation: "kjv"
};

const SUPPORTED_TRANSLATIONS = new Set(["kjv", "web", "bbe"]);

const reflectionPrompts = [
  "What truth from Scripture is God highlighting for you today?",
  "Where did you notice God's faithfulness in the last 24 hours?",
  "What is one area where you need to trust God more deeply right now?",
  "Which command from today's reading needs practical obedience?",
  "What fear can you surrender to God in prayer today?",
  "How can you love someone intentionally with Christlike humility?",
  "What mindset needs renewing according to God's Word?",
  "Where have you seen God answer prayer recently?",
  "What action would align your schedule with your faith this week?",
  "What would it look like to walk by the Spirit today?"
];

let currentUser = null;
let state = createDefaultState();

const els = {
  authGate: document.getElementById("authGate"),
  guestLanding: document.getElementById("guestLanding"),
  authCard: document.getElementById("authCard"),
  appShell: document.getElementById("appShell"),
  continueGuestBtn: document.getElementById("continueGuestBtn"),
  openLoginBtn: document.getElementById("openLoginBtn"),
  openSignupBtn: document.getElementById("openSignupBtn"),
  backToLandingBtn: document.getElementById("backToLandingBtn"),
  showLoginBtn: document.getElementById("showLoginBtn"),
  showSignupBtn: document.getElementById("showSignupBtn"),
  loginForm: document.getElementById("loginForm"),
  signupForm: document.getElementById("signupForm"),
  loginEmail: document.getElementById("loginEmail"),
  loginPassword: document.getElementById("loginPassword"),
  signupName: document.getElementById("signupName"),
  signupEmail: document.getElementById("signupEmail"),
  signupPassword: document.getElementById("signupPassword"),
  signupConfirmPassword: document.getElementById("signupConfirmPassword"),
  authMessage: document.getElementById("authMessage"),
  accountName: document.getElementById("accountName"),
  accountRoleBadge: document.getElementById("accountRoleBadge"),
  logoutBtn: document.getElementById("logoutBtn"),
  refreshAdminBtn: document.getElementById("refreshAdminBtn"),
  adminTotalUsers: document.getElementById("adminTotalUsers"),
  adminTotalAdmins: document.getElementById("adminTotalAdmins"),
  adminTotalPrayers: document.getElementById("adminTotalPrayers"),
  adminTotalAnnouncements: document.getElementById("adminTotalAnnouncements"),
  adminNotice: document.getElementById("adminNotice"),
  adminUsersList: document.getElementById("adminUsersList"),
  adminPrayerRequests: document.getElementById("adminPrayerRequests"),
  announcementForm: document.getElementById("announcementForm"),
  announcementTitle: document.getElementById("announcementTitle"),
  announcementBody: document.getElementById("announcementBody"),
  adminAnnouncementsList: document.getElementById("adminAnnouncementsList"),
  dashboardAnnouncements: document.getElementById("dashboardAnnouncements"),
  faqList: document.getElementById("faqList"),
  streakCount: document.getElementById("streakCount"),
  progressCount: document.getElementById("progressCount"),
  notesCount: document.getElementById("notesCount"),
  reflectionsCount: document.getElementById("reflectionsCount"),
  todayVerseText: document.getElementById("todayVerseText"),
  todayVerseRef: document.getElementById("todayVerseRef"),
  memoryVerseText: document.getElementById("memoryVerseText"),
  memoryVerseRef: document.getElementById("memoryVerseRef"),
  nextReading: document.getElementById("nextReading"),
  latestReflectionPrompt: document.getElementById("latestReflectionPrompt"),
  latestReflectionBody: document.getElementById("latestReflectionBody"),
  markTodayBtn: document.getElementById("markTodayBtn"),
  bookmarkList: document.getElementById("bookmarkList"),
  readingPlanList: document.getElementById("readingPlanList"),
  verseSearch: document.getElementById("verseSearch"),
  verseResults: document.getElementById("verseResults"),
  noteForm: document.getElementById("noteForm"),
  noteTitle: document.getElementById("noteTitle"),
  noteRef: document.getElementById("noteRef"),
  noteBody: document.getElementById("noteBody"),
  notesList: document.getElementById("notesList"),
  reflectionForm: document.getElementById("reflectionForm"),
  reflectionPromptText: document.getElementById("reflectionPromptText"),
  reflectionReference: document.getElementById("reflectionReference"),
  reflectionBody: document.getElementById("reflectionBody"),
  reflectionAction: document.getElementById("reflectionAction"),
  reflectionList: document.getElementById("reflectionList"),
  bibleBook: document.getElementById("bibleBook"),
  bibleChapter: document.getElementById("bibleChapter"),
  bibleTranslation: document.getElementById("bibleTranslation"),
  bibleLoadBtn: document.getElementById("bibleLoadBtn"),
  biblePrevBtn: document.getElementById("biblePrevBtn"),
  bibleNextBtn: document.getElementById("bibleNextBtn"),
  bibleBookmarkBtn: document.getElementById("bibleBookmarkBtn"),
  bibleStatus: document.getElementById("bibleStatus"),
  bibleChapterTitle: document.getElementById("bibleChapterTitle"),
  bibleChapterContent: document.getElementById("bibleChapterContent"),
  bibleChapterInsight: document.getElementById("bibleChapterInsight"),
  prayerForm: document.getElementById("prayerForm"),
  prayerText: document.getElementById("prayerText"),
  prayerCategory: document.getElementById("prayerCategory"),
  prayerList: document.getElementById("prayerList")
};

initialize();

function initialize() {
  ensureAdminPresence();
  ensureDefaultAnnouncements();
  bindTabs();
  bindQuickLinks();
  bindAuth();
  bindAdmin();
  bindFaq();
  bindForms();
  bindDashboardActions();
  bindBibleReader();

  const sessionUser = getSessionUser();
  if (sessionUser) {
    if (sessionUser.isGuest) {
      activateGuestSession();
    } else {
      activateUserSession(sessionUser);
    }
    return;
  }

  showGuestLanding();
}

function bindTabs() {
  const tabs = document.querySelectorAll("nav.tabs .tab[data-tab]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setActiveTab(tab.dataset.tab);
    });
  });
}

function bindQuickLinks() {
  const quickLinks = document.querySelectorAll("[data-quick-nav]");
  quickLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setActiveTab(link.dataset.quickNav);
    });
  });
}

function setActiveTab(target) {
  const isAdminTab = target === "admin";
  if (isAdminTab && !isCurrentUserAdmin()) {
    target = "dashboard";
  }

  const tabs = document.querySelectorAll("nav.tabs .tab[data-tab]");
  const panels = document.querySelectorAll("[data-panel]");

  tabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tab === target);
  });

  const quickLinks = document.querySelectorAll("[data-quick-nav]");
  quickLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.quickNav === target);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `panel-${target}`);
  });
}

function bindAuth() {
  els.continueGuestBtn.addEventListener("click", () => {
    activateGuestSession();
  });

  els.openLoginBtn.addEventListener("click", () => {
    showAuthCard("login");
  });

  els.openSignupBtn.addEventListener("click", () => {
    showAuthCard("signup");
  });

  els.backToLandingBtn.addEventListener("click", () => {
    showGuestLanding();
  });

  els.showLoginBtn.addEventListener("click", () => {
    setAuthMode("login");
  });

  els.showSignupBtn.addEventListener("click", () => {
    setAuthMode("signup");
  });

  els.loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = normalizeEmail(els.loginEmail.value);
    const password = els.loginPassword.value;
    let user = findUserByEmail(email);

    // Demo mode: accept any login credentials.
    if (!user) {
      const users = loadUsers();
      const fallbackName = email.split("@")[0] || "Member";
      const role = countAdmins(users) === 0 ? "admin" : "member";
      user = {
        id: crypto.randomUUID(),
        name: fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1),
        email,
        password,
        role,
        createdAt: new Date().toISOString()
      };
      users.push(user);
      saveUsers(users);
    }

    activateUserSession(user);
    showAuthMessage("", false);
  });

  els.signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = els.signupName.value.trim();
    const email = normalizeEmail(els.signupEmail.value);
    const password = els.signupPassword.value;
    const confirm = els.signupConfirmPassword.value;

    if (!name) {
      showAuthMessage("Please enter your name.", true);
      return;
    }

    if (!email || !email.includes("@")) {
      showAuthMessage("Please enter a valid email address.", true);
      return;
    }

    if (password.length < 6) {
      showAuthMessage("Password must be at least 6 characters.", true);
      return;
    }

    if (password !== confirm) {
      showAuthMessage("Passwords do not match.", true);
      return;
    }

    if (findUserByEmail(email)) {
      showAuthMessage("That email is already registered. Please log in.", true);
      setAuthMode("login");
      return;
    }

    const users = loadUsers();
    const role = countAdmins(users) === 0 ? "admin" : "member";
    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      role,
      createdAt: new Date().toISOString()
    };

    users.push(user);
    saveUsers(users);
    activateUserSession(user);
    showAuthMessage("", false);
  });

  els.logoutBtn.addEventListener("click", () => {
    clearSession();
    currentUser = null;
    state = createDefaultState();
    els.accountRoleBadge.textContent = "Member";
    showAdminNotice("");
    showGuestLanding();
  });
}

function bindAdmin() {
  els.refreshAdminBtn.addEventListener("click", () => {
    renderAdminPanel();
  });

  els.adminUsersList.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || !isCurrentUserAdmin()) {
      return;
    }

    const roleTargetId = button.dataset.roleUserId;
    const deleteTargetId = button.dataset.deleteUserId;

    if (roleTargetId) {
      toggleUserRole(roleTargetId);
      return;
    }

    if (deleteTargetId) {
      deleteUser(deleteTargetId);
    }
  });

  if (els.adminPrayerRequests) {
    els.adminPrayerRequests.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button || !isCurrentUserAdmin()) {
        return;
      }

      const prayerKey = button.dataset.adminPrayerKey;
      if (!prayerKey) {
        return;
      }

      if (button.dataset.adminPrayerToggle === "true") {
        toggleAdminPrayerAnswered(prayerKey);
      }

      if (button.dataset.adminPrayerDelete === "true") {
        deleteAdminPrayer(prayerKey);
      }
    });
  }

  if (els.announcementForm) {
    els.announcementForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!isCurrentUserAdmin()) {
        return;
      }

      const title = els.announcementTitle.value.trim();
      const body = els.announcementBody.value.trim();
      if (!title || !body) {
        showAdminNotice("Announcement title and message are required.");
        return;
      }

      const announcements = loadAnnouncements();
      announcements.unshift({
        id: crypto.randomUUID(),
        title,
        body,
        createdAt: new Date().toISOString(),
        author: currentUser ? currentUser.name : "Admin"
      });
      saveAnnouncements(announcements);
      els.announcementForm.reset();
      showAdminNotice("Announcement published.");
      renderAdminPanel();
      renderDashboardAnnouncements();
    });
  }

  if (els.adminAnnouncementsList) {
    els.adminAnnouncementsList.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button || !isCurrentUserAdmin()) {
        return;
      }

      const announcementId = button.dataset.announcementDeleteId;
      if (!announcementId) {
        return;
      }

      deleteAnnouncement(announcementId);
    });
  }
}

function bindFaq() {
  if (!els.faqList) {
    return;
  }

  els.faqList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-faq-toggle]");
    if (!button) {
      return;
    }

    const item = button.closest(".faq-item");
    if (!item) {
      return;
    }

    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");
    if (!answer || !icon) {
      return;
    }

    const open = item.classList.contains("is-open");

    els.faqList.querySelectorAll(".faq-item").forEach((entry) => {
      entry.classList.remove("is-open");
      const entryButton = entry.querySelector("[data-faq-toggle]");
      const entryAnswer = entry.querySelector(".faq-answer");
      const entryIcon = entry.querySelector(".faq-icon");
      if (entryButton) {
        entryButton.setAttribute("aria-expanded", "false");
      }
      if (entryAnswer) {
        entryAnswer.classList.add("is-hidden");
      }
      if (entryIcon) {
        entryIcon.textContent = "+";
      }
    });

    if (!open) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      answer.classList.remove("is-hidden");
      icon.textContent = "-";
    }
  });
}

function setAuthMode(mode) {
  const isLogin = mode === "login";
  els.showLoginBtn.classList.toggle("is-active", isLogin);
  els.showSignupBtn.classList.toggle("is-active", !isLogin);
  els.loginForm.classList.toggle("is-hidden", !isLogin);
  els.signupForm.classList.toggle("is-hidden", isLogin);
}

function showAuthMessage(message, isError) {
  els.authMessage.textContent = message;
  els.authMessage.classList.toggle("error", Boolean(isError && message));
  els.authMessage.classList.toggle("success", Boolean(!isError && message));
}

function showAuthGate() {
  els.authGate.classList.remove("is-hidden");
  els.appShell.classList.add("is-hidden");
}

function showGuestLanding() {
  showAuthGate();
  els.guestLanding.classList.remove("is-hidden");
  els.authCard.classList.add("is-hidden");
  setAuthMode("login");
  showAuthMessage("", false);
}

function showAuthCard(mode) {
  showAuthGate();
  els.guestLanding.classList.add("is-hidden");
  els.authCard.classList.remove("is-hidden");
  setAuthMode(mode);
  showAuthMessage("", false);
}

function showAppShell() {
  els.authGate.classList.add("is-hidden");
  els.appShell.classList.remove("is-hidden");
  refreshAdminVisibility();
}

function isCurrentUserAdmin() {
  return Boolean(currentUser && normalizeRole(currentUser.role) === "admin");
}

function activateGuestSession() {
  currentUser = createGuestUser();
  setGuestSession();
  state = loadStateForUser(currentUser.id);
  initializeBibleReaderInputs();
  renderAll();
  loadBibleChapter();
  els.accountName.textContent = "Guest Mode";
  els.accountRoleBadge.textContent = "Guest";
  setActiveTab("dashboard");
  els.loginForm.reset();
  els.signupForm.reset();
  showAppShell();
}

function activateUserSession(user) {
  currentUser = {
    ...user,
    role: normalizeRole(user.role)
  };
  setSession(user.id);
  state = loadStateForUser(user.id);
  initializeBibleReaderInputs();
  renderAll();
  loadBibleChapter();
  els.accountName.textContent = `${user.name} (${user.email})`;
  els.accountRoleBadge.textContent = isCurrentUserAdmin() ? "Admin" : "Member";
  setActiveTab("dashboard");
  els.loginForm.reset();
  els.signupForm.reset();
  showAppShell();
}

function bindForms() {
  els.verseSearch.addEventListener("input", (event) => {
    renderVerseResults(event.target.value.trim().toLowerCase());
  });

  els.noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const note = {
      id: crypto.randomUUID(),
      title: els.noteTitle.value.trim(),
      reference: els.noteRef.value.trim(),
      body: els.noteBody.value.trim(),
      createdAt: new Date().toISOString()
    };

    if (!note.title || !note.body) {
      return;
    }

    state.notes.unshift(note);
    recordStudyDay();
    saveState();
    els.noteForm.reset();
    renderAll();
  });

  els.prayerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const prayer = {
      id: crypto.randomUUID(),
      text: els.prayerText.value.trim(),
      category: els.prayerCategory.value,
      answered: false,
      createdAt: new Date().toISOString()
    };

    if (!prayer.text) {
      return;
    }

    state.prayers.unshift(prayer);
    recordStudyDay();
    saveState();
    els.prayerForm.reset();
    renderAll();
  });

  els.reflectionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const reflection = {
      id: crypto.randomUUID(),
      prompt: getDailyReflectionPrompt(),
      reference: els.reflectionReference.value.trim(),
      body: els.reflectionBody.value.trim(),
      action: els.reflectionAction.value.trim(),
      createdAt: new Date().toISOString()
    };

    if (!reflection.body || !reflection.action) {
      return;
    }

    state.reflections.unshift(reflection);
    recordStudyDay();
    saveState();
    els.reflectionForm.reset();
    renderAll();
  });
}

function bindDashboardActions() {
  els.markTodayBtn.addEventListener("click", () => {
    if (isTodayStudied()) {
      return;
    }

    recordStudyDay();
    saveState();
    renderAll();
  });
}

function bindBibleReader() {
  els.bibleBook.addEventListener("change", () => {
    populateBibleChapterOptions(els.bibleBook.value, 1);
    renderBibleBookmarkButton();
    loadBibleChapter();
  });

  els.bibleChapter.addEventListener("change", () => {
    renderBibleBookmarkButton();
    loadBibleChapter();
  });

  els.bibleLoadBtn.addEventListener("click", () => {
    loadBibleChapter();
  });

  els.bibleTranslation.addEventListener("change", () => {
    state.bibleReader.translation = els.bibleTranslation.value;
    saveState();
    loadBibleChapter();
  });

  els.biblePrevBtn.addEventListener("click", () => {
    shiftBibleChapter(-1);
  });

  els.bibleNextBtn.addEventListener("click", () => {
    shiftBibleChapter(1);
  });

  els.bibleBookmarkBtn.addEventListener("click", () => {
    const reference = getSelectedChapterReference();
    const saved = toggleBookmark(reference);
    els.bibleStatus.textContent = saved
      ? `Saved bookmark for ${reference}.`
      : `Removed bookmark for ${reference}.`;
    renderBookmarks();
    renderBibleBookmarkButton();
  });
}

function initializeBibleReaderInputs() {
  els.bibleBook.innerHTML = bibleBooks
    .map((book) => `<option value="${escapeHtml(book.name)}">${escapeHtml(book.name)}</option>`)
    .join("");

  els.bibleBook.value = state.bibleReader.book;
  populateBibleChapterOptions(state.bibleReader.book, state.bibleReader.chapter);
  els.bibleTranslation.value = state.bibleReader.translation;
  renderBibleBookmarkButton();
}

function renderAll() {
  renderMarkTodayButton();
  renderBibleBookmarkButton();
  renderStats();
  renderDashboardVerses();
  renderNextReading();
  renderLatestReflection();
  renderDashboardAnnouncements();
  renderBookmarks();
  renderReadingPlan();
  renderVerseResults(els.verseSearch.value.trim().toLowerCase());
  renderNotes();
  renderReflectionPrompt();
  renderReflections();
  renderPrayers();
  renderAdminPanel();
}

function renderBibleBookmarkButton() {
  if (!els.bibleBookmarkBtn || !els.bibleBook || !els.bibleChapter) {
    return;
  }

  const reference = getSelectedChapterReference();
  const isSaved = state.bookmarks.includes(reference);

  els.bibleBookmarkBtn.textContent = isSaved ? "Bookmarked \u2713" : "Bookmark Chapter";
  els.bibleBookmarkBtn.classList.toggle("is-active", isSaved);
  els.bibleBookmarkBtn.setAttribute("aria-pressed", isSaved ? "true" : "false");
}

function renderMarkTodayButton() {
  const studiedToday = isTodayStudied();

  els.markTodayBtn.textContent = studiedToday ? "Studied Today \u2713" : "Mark Today As Studied";
  els.markTodayBtn.classList.toggle("is-complete", studiedToday);
  els.markTodayBtn.disabled = studiedToday;
  els.markTodayBtn.setAttribute("aria-pressed", studiedToday ? "true" : "false");
}

function renderStats() {
  const completedCount = readingPlan.filter((item) => state.completedReadings[item.id]).length;
  const percent = Math.round((completedCount / readingPlan.length) * 100);

  els.streakCount.textContent = `${calculateStreak()} ${calculateStreak() === 1 ? "day" : "days"}`;
  els.progressCount.textContent = `${percent}%`;
  els.notesCount.textContent = String(state.notes.length);
  els.reflectionsCount.textContent = String(state.reflections.length);
}

function renderDashboardVerses() {
  const index = getDayOfYear(new Date()) % verses.length;
  const memoryIndex = (index + 5) % verses.length;
  const today = verses[index];
  const memory = verses[memoryIndex];

  els.todayVerseText.textContent = `\u201c${today.text}\u201d`;
  els.todayVerseRef.textContent = today.reference;

  els.memoryVerseText.textContent = memory.text;
  els.memoryVerseRef.textContent = memory.reference;
}

function renderNextReading() {
  const next = readingPlan.find((item) => !state.completedReadings[item.id]);

  if (!next) {
    els.nextReading.textContent = "All 14 readings completed. Review your notes and start a new cycle.";
    return;
  }

  els.nextReading.textContent = `Day ${next.day}: ${next.reference} - ${next.theme}`;
}

function renderBookmarks() {
  const saved = state.bookmarks;

  if (!saved.length) {
    els.bookmarkList.innerHTML = '<p class="empty">No bookmarks yet. Save passages from Verse Explorer or Bible Reader.</p>';
    return;
  }

  els.bookmarkList.innerHTML = saved
    .map((reference) => `<span class="chip">${escapeHtml(reference)}</span>`)
    .join("");
}

function renderLatestReflection() {
  const latest = state.reflections[0];

  if (!latest) {
    els.latestReflectionPrompt.textContent = "No reflections yet.";
    els.latestReflectionBody.textContent = "Add your first reflection in the Reflection tab.";
    return;
  }

  const created = new Date(latest.createdAt).toLocaleDateString();
  els.latestReflectionPrompt.textContent = `${latest.prompt} (${created})`;
  els.latestReflectionBody.textContent = latest.body;
}

function renderDashboardAnnouncements() {
  if (!els.dashboardAnnouncements) {
    return;
  }

  const announcements = loadAnnouncements();
  if (!announcements.length) {
    els.dashboardAnnouncements.innerHTML = '<p class="empty">No announcements yet.</p>';
    return;
  }

  const recent = announcements.slice(0, 3);
  els.dashboardAnnouncements.innerHTML = recent
    .map((item) => {
      const created = new Date(item.createdAt).toLocaleDateString();
      return `
        <article class="entry">
          <h4>${escapeHtml(item.title)}</h4>
          <p class="meta">${escapeHtml(created)}${item.author ? ` - ${escapeHtml(item.author)}` : ""}</p>
          <p>${escapeHtml(item.body)}</p>
        </article>
      `;
    })
    .join("");
}

function renderReadingPlan() {
  els.readingPlanList.innerHTML = readingPlan
    .map((item) => {
      const done = Boolean(state.completedReadings[item.id]);
      return `
        <li class="reading-item ${done ? "is-done" : ""}">
          <input type="checkbox" data-reading-id="${item.id}" ${done ? "checked" : ""} aria-label="Mark day ${item.day} complete" />
          <div class="reading-content">
            <p><strong>Day ${item.day} - ${escapeHtml(item.reference)}</strong></p>
            <p>${escapeHtml(item.theme)}</p>
            <p class="meta">Reflect: ${escapeHtml(item.prompt)}</p>
          </div>
        </li>
      `;
    })
    .join("");

  els.readingPlanList.querySelectorAll("[data-reading-id]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const readingId = Number(checkbox.dataset.readingId);
      state.completedReadings[readingId] = checkbox.checked;

      if (checkbox.checked) {
        recordStudyDay();
      }

      saveState();
      renderAll();
    });
  });
}

function renderVerseResults(query) {
  const filtered = verses.filter((verse) => {
    if (!query) {
      return true;
    }

    const source = `${verse.reference} ${verse.topic} ${verse.text}`.toLowerCase();
    return source.includes(query);
  });

  if (!filtered.length) {
    els.verseResults.innerHTML = '<p class="empty">No verses matched your search.</p>';
    return;
  }

  els.verseResults.innerHTML = filtered
    .map((verse) => {
      const saved = state.bookmarks.includes(verse.reference);
      const insight = getVerseInsightText(verse);
      return `
        <article class="verse-card">
          <header>
            <div>
              <strong>${escapeHtml(verse.reference)}</strong>
              <p class="meta">${escapeHtml(verse.topic)}</p>
            </div>
            <button class="bookmark-btn ${saved ? "is-saved" : ""}" data-bookmark-ref="${escapeHtml(verse.reference)}" type="button">
              ${saved ? "Saved" : "Save"}
            </button>
          </header>
          <p>${escapeHtml(verse.text)}</p>
          <p class="insight-text"><strong>Insight:</strong> ${escapeHtml(insight)}</p>
        </article>
      `;
    })
    .join("");

  els.verseResults.querySelectorAll("[data-bookmark-ref]").forEach((button) => {
    button.addEventListener("click", () => {
      const ref = button.dataset.bookmarkRef;
      toggleBookmark(ref);
      renderAll();
    });
  });
}

function renderNotes() {
  if (!state.notes.length) {
    els.notesList.innerHTML = '<p class="empty">No notes yet. Capture what God is teaching you.</p>';
    return;
  }

  els.notesList.innerHTML = state.notes
    .map((note) => {
      const created = new Date(note.createdAt).toLocaleDateString();
      return `
        <article class="entry">
          <h4>${escapeHtml(note.title)}</h4>
          <p class="meta">${escapeHtml(note.reference || "No reference")} - ${escapeHtml(created)}</p>
          <p>${escapeHtml(note.body)}</p>
          <div class="entry-actions">
            <button class="small-btn danger" data-delete-note="${note.id}" type="button">Delete</button>
          </div>
        </article>
      `;
    })
    .join("");

  els.notesList.querySelectorAll("[data-delete-note]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.deleteNote;
      state.notes = state.notes.filter((note) => note.id !== id);
      saveState();
      renderAll();
    });
  });
}

function renderReflectionPrompt() {
  els.reflectionPromptText.textContent = getDailyReflectionPrompt();
}

function renderReflections() {
  if (!state.reflections.length) {
    els.reflectionList.innerHTML = '<p class="empty">No reflections saved yet.</p>';
    return;
  }

  els.reflectionList.innerHTML = state.reflections
    .map((reflection) => {
      const created = new Date(reflection.createdAt).toLocaleDateString();
      return `
        <article class="entry">
          <p class="meta">${escapeHtml(reflection.prompt)} - ${escapeHtml(created)}</p>
          <p class="meta">${escapeHtml(reflection.reference || "No scripture reference")}</p>
          <p>${escapeHtml(reflection.body)}</p>
          <p><strong>Action:</strong> ${escapeHtml(reflection.action)}</p>
          <div class="entry-actions">
            <button class="small-btn danger" data-delete-reflection="${reflection.id}" type="button">Delete</button>
          </div>
        </article>
      `;
    })
    .join("");

  els.reflectionList.querySelectorAll("[data-delete-reflection]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.deleteReflection;
      state.reflections = state.reflections.filter((reflection) => reflection.id !== id);
      saveState();
      renderAll();
    });
  });
}

function renderPrayers() {
  if (!state.prayers.length) {
    els.prayerList.innerHTML = '<p class="empty">No prayer requests yet. Add one to begin journaling.</p>';
    return;
  }

  els.prayerList.innerHTML = state.prayers
    .map((prayer) => {
      const created = new Date(prayer.createdAt).toLocaleDateString();
      return `
        <article class="entry">
          <p class="meta">${escapeHtml(prayer.category)} - ${escapeHtml(created)}</p>
          <p class="${prayer.answered ? "prayer-done" : ""}">${escapeHtml(prayer.text)}</p>
          <div class="entry-actions">
            <button class="small-btn ok" data-toggle-prayer="${prayer.id}" type="button">
              ${prayer.answered ? "Mark Unanswered" : "Mark Answered"}
            </button>
            <button class="small-btn danger" data-delete-prayer="${prayer.id}" type="button">Delete</button>
          </div>
        </article>
      `;
    })
    .join("");

  els.prayerList.querySelectorAll("[data-toggle-prayer]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.togglePrayer;
      const prayer = state.prayers.find((item) => item.id === id);

      if (!prayer) {
        return;
      }

      prayer.answered = !prayer.answered;
      if (prayer.answered) {
        recordStudyDay();
      }

      saveState();
      renderAll();
    });
  });

  els.prayerList.querySelectorAll("[data-delete-prayer]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.deletePrayer;
      state.prayers = state.prayers.filter((item) => item.id !== id);
      saveState();
      renderAll();
    });
  });
}

function refreshAdminVisibility() {
  const adminOnlyElements = document.querySelectorAll("[data-admin-only]");
  const isAdmin = isCurrentUserAdmin();

  adminOnlyElements.forEach((element) => {
    element.classList.toggle("is-hidden", !isAdmin);
  });

  if (!isAdmin) {
    setActiveTab("dashboard");
  }
}

function renderAdminPanel() {
  if (!isCurrentUserAdmin()) {
    return;
  }

  const users = loadUsers();
  const adminsCount = countAdmins(users);
  const allPrayerRequests = getAllPrayerRequests();
  const announcements = loadAnnouncements();

  els.adminTotalUsers.textContent = `Total users: ${users.length}`;
  els.adminTotalAdmins.textContent = `Admins: ${adminsCount}`;
  if (els.adminTotalPrayers) {
    els.adminTotalPrayers.textContent = `Prayer requests: ${allPrayerRequests.length}`;
  }
  if (els.adminTotalAnnouncements) {
    els.adminTotalAnnouncements.textContent = `Announcements: ${announcements.length}`;
  }

  if (!users.length) {
    els.adminUsersList.innerHTML = '<p class="empty">No users found.</p>';
  } else {
    const sortedUsers = users.slice().sort((a, b) => a.name.localeCompare(b.name));
    els.adminUsersList.innerHTML = sortedUsers
      .map((user) => {
        const role = normalizeRole(user.role);
        const isSelf = currentUser && user.id === currentUser.id;
        const canToggleRole = !(isSelf && adminsCount === 1);
        const roleButtonLabel = role === "admin" ? "Demote To Member" : "Promote To Admin";

        return `
          <article class="entry">
            <h4>${escapeHtml(user.name)}</h4>
            <p class="meta">${escapeHtml(user.email)} - ${role === "admin" ? "Admin" : "Member"}</p>
            <div class="entry-actions">
              <button
                class="small-btn warn"
                type="button"
                data-role-user-id="${user.id}"
                ${canToggleRole ? "" : "disabled"}
              >
                ${roleButtonLabel}
              </button>
              <button
                class="small-btn danger"
                type="button"
                data-delete-user-id="${user.id}"
                ${isSelf ? "disabled" : ""}
              >
                Delete User
              </button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  if (els.adminPrayerRequests) {
    if (!allPrayerRequests.length) {
      els.adminPrayerRequests.innerHTML = '<p class="empty">No prayer requests found across users.</p>';
    } else {
      els.adminPrayerRequests.innerHTML = allPrayerRequests
        .map((prayer) => {
          const created = new Date(prayer.createdAt).toLocaleDateString();
          return `
            <article class="entry">
              <p class="meta">${escapeHtml(prayer.ownerName)} (${escapeHtml(prayer.ownerEmail)}) - ${escapeHtml(prayer.category)} - ${escapeHtml(created)}</p>
              <p class="${prayer.answered ? "prayer-done" : ""}">${escapeHtml(prayer.text)}</p>
              <div class="entry-actions">
                <button class="small-btn ok" type="button" data-admin-prayer-key="${prayer.key}" data-admin-prayer-toggle="true">
                  ${prayer.answered ? "Mark Unanswered" : "Mark Answered"}
                </button>
                <button class="small-btn danger" type="button" data-admin-prayer-key="${prayer.key}" data-admin-prayer-delete="true">
                  Delete
                </button>
              </div>
            </article>
          `;
        })
        .join("");
    }
  }

  if (els.adminAnnouncementsList) {
    if (!announcements.length) {
      els.adminAnnouncementsList.innerHTML = '<p class="empty">No announcements published yet.</p>';
    } else {
      els.adminAnnouncementsList.innerHTML = announcements
        .map((item) => {
          const created = new Date(item.createdAt).toLocaleDateString();
          return `
            <article class="entry">
              <h4>${escapeHtml(item.title)}</h4>
              <p class="meta">${escapeHtml(created)}${item.author ? ` - ${escapeHtml(item.author)}` : ""}</p>
              <p>${escapeHtml(item.body)}</p>
              <div class="entry-actions">
                <button class="small-btn danger" type="button" data-announcement-delete-id="${item.id}">Delete</button>
              </div>
            </article>
          `;
        })
        .join("");
    }
  }
}

function toggleUserRole(userId) {
  const users = loadUsers();
  const target = users.find((user) => user.id === userId);
  if (!target) {
    return;
  }

  const currentRole = normalizeRole(target.role);
  if (currentRole === "admin" && countAdmins(users) <= 1) {
    showAdminNotice("At least one admin must remain.");
    return;
  }

  target.role = currentRole === "admin" ? "member" : "admin";
  saveUsers(users);

  if (currentUser && currentUser.id === target.id) {
    currentUser.role = normalizeRole(target.role);
    els.accountRoleBadge.textContent = isCurrentUserAdmin() ? "Admin" : "Member";
    refreshAdminVisibility();
  }

  showAdminNotice(`${target.name} is now ${target.role}.`);
  renderAdminPanel();
}

function deleteUser(userId) {
  const users = loadUsers();
  const target = users.find((user) => user.id === userId);
  if (!target) {
    return;
  }

  if (currentUser && target.id === currentUser.id) {
    showAdminNotice("You cannot delete your own account.");
    return;
  }

  const remainingUsers = users.filter((user) => user.id !== userId);
  if (normalizeRole(target.role) === "admin" && countAdmins(remainingUsers) === 0) {
    showAdminNotice("Cannot delete the last admin account.");
    return;
  }

  saveUsers(remainingUsers);
  localStorage.removeItem(`${APP_STATE_PREFIX}${userId}`);
  showAdminNotice(`Deleted ${target.name}.`);
  renderAdminPanel();
}

function showAdminNotice(message) {
  els.adminNotice.textContent = message;
}

function getManagedProfiles() {
  const profiles = loadUsers().map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));

  if (localStorage.getItem(`${APP_STATE_PREFIX}${GUEST_USER_ID}`)) {
    profiles.push({
      id: GUEST_USER_ID,
      name: "Guest",
      email: "guest@local"
    });
  }

  return profiles;
}

function getAllPrayerRequests() {
  const prayers = [];
  const profiles = getManagedProfiles();

  profiles.forEach((profile) => {
    const profileState = loadStateForUser(profile.id);
    profileState.prayers.forEach((prayer) => {
      prayers.push({
        ...prayer,
        ownerId: profile.id,
        ownerName: profile.name,
        ownerEmail: profile.email,
        key: `${profile.id}::${prayer.id}`
      });
    });
  });

  prayers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return prayers;
}

function parsePrayerAdminKey(key) {
  const [ownerId, prayerId] = String(key || "").split("::");
  if (!ownerId || !prayerId) {
    return null;
  }
  return { ownerId, prayerId };
}

function toggleAdminPrayerAnswered(prayerKey) {
  const parsed = parsePrayerAdminKey(prayerKey);
  if (!parsed) {
    return;
  }

  const ownerState = loadStateForUser(parsed.ownerId);
  const targetPrayer = ownerState.prayers.find((item) => item.id === parsed.prayerId);
  if (!targetPrayer) {
    showAdminNotice("Prayer request no longer exists.");
    return;
  }

  targetPrayer.answered = !targetPrayer.answered;
  saveStateForUser(parsed.ownerId, ownerState);

  if (currentUser && currentUser.id === parsed.ownerId) {
    state = ownerState;
    renderPrayers();
    renderStats();
  }

  showAdminNotice("Prayer request updated.");
  renderAdminPanel();
}

function deleteAdminPrayer(prayerKey) {
  const parsed = parsePrayerAdminKey(prayerKey);
  if (!parsed) {
    return;
  }

  const ownerState = loadStateForUser(parsed.ownerId);
  const beforeCount = ownerState.prayers.length;
  ownerState.prayers = ownerState.prayers.filter((item) => item.id !== parsed.prayerId);

  if (ownerState.prayers.length === beforeCount) {
    showAdminNotice("Prayer request no longer exists.");
    return;
  }

  saveStateForUser(parsed.ownerId, ownerState);

  if (currentUser && currentUser.id === parsed.ownerId) {
    state = ownerState;
    renderPrayers();
    renderStats();
  }

  showAdminNotice("Prayer request deleted.");
  renderAdminPanel();
}

function deleteAnnouncement(announcementId) {
  const announcements = loadAnnouncements();
  const nextAnnouncements = announcements.filter((item) => item.id !== announcementId);
  saveAnnouncements(nextAnnouncements);
  showAdminNotice("Announcement deleted.");
  renderAdminPanel();
  renderDashboardAnnouncements();
}

function populateBibleChapterOptions(bookName, selectedChapter) {
  const book = getBibleBook(bookName);
  const chapter = clampChapter(book, Number(selectedChapter) || 1);

  els.bibleChapter.innerHTML = Array.from({ length: book.chapters }, (_, index) => index + 1)
    .map((number) => `<option value="${number}">${number}</option>`)
    .join("");

  els.bibleChapter.value = String(chapter);
}

function shiftBibleChapter(step) {
  const currentBook = getBibleBook(els.bibleBook.value);
  const currentChapter = Number(els.bibleChapter.value);
  const currentBookIndex = bibleBooks.findIndex((book) => book.name === currentBook.name);
  let nextBookIndex = currentBookIndex;
  let nextChapter = currentChapter + step;

  if (step < 0 && currentBookIndex === 0 && currentChapter === 1) {
    return;
  }

  if (step > 0 && currentBookIndex === bibleBooks.length - 1 && currentChapter === currentBook.chapters) {
    return;
  }

  if (nextChapter < 1) {
    nextBookIndex = currentBookIndex - 1;
    const nextBook = bibleBooks[nextBookIndex];
    els.bibleBook.value = nextBook.name;
    populateBibleChapterOptions(nextBook.name, nextBook.chapters);
  } else if (nextChapter > currentBook.chapters) {
    nextBookIndex = currentBookIndex + 1;
    const nextBook = bibleBooks[nextBookIndex];
    els.bibleBook.value = nextBook.name;
    populateBibleChapterOptions(nextBook.name, 1);
  } else {
    els.bibleChapter.value = String(nextChapter);
  }

  loadBibleChapter();
}

async function loadBibleChapter() {
  if (!currentUser) {
    return;
  }

  const book = getBibleBook(els.bibleBook.value);
  const chapter = clampChapter(book, Number(els.bibleChapter.value));
  const translation = sanitizeTranslation(els.bibleTranslation.value);
  const reference = `${book.name} ${chapter}`;
  const query = encodeURIComponent(reference);

  els.bibleChapter.value = String(chapter);
  els.bibleTranslation.value = translation;
  renderBibleBookmarkButton();
  state.bibleReader = { book: book.name, chapter, translation };
  saveState();

  els.bibleStatus.textContent = `Loading ${reference}...`;
  els.bibleChapterTitle.textContent = reference;
  els.bibleChapterContent.innerHTML = '<p class="empty">Loading chapter...</p>';
  els.bibleChapterInsight.textContent = "";

  try {
    const response = await fetch(`https://bible-api.com/${query}?translation=${translation}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    const versesList = Array.isArray(payload.verses) ? payload.verses : [];
    const title = payload.reference || reference;

    els.bibleChapterTitle.textContent = title;

    if (!versesList.length) {
      const text = String(payload.text || "").trim();
      els.bibleChapterContent.innerHTML = text
        ? `<p>${escapeHtml(text)}</p>`
        : '<p class="empty">No verses returned for this chapter.</p>';
    } else {
      els.bibleChapterContent.innerHTML = versesList
        .map((verse) => {
          const verseText = String(verse.text || "").trim();
          return `
            <p class="chapter-verse">
              <span class="verse-num">${verse.verse}</span>
              <span>${escapeHtml(verseText)}</span>
            </p>
          `;
        })
        .join("");
    }

    const translationLabel = translation.toUpperCase();
    els.bibleStatus.textContent = `${title} loaded (${translationLabel}).`;
    els.bibleChapterInsight.textContent = buildChapterInsight(book.name, chapter, versesList);
    recordStudyDay();
    saveState();
    renderStats();
  } catch (error) {
    els.bibleStatus.textContent = "Could not load this chapter. Check your internet connection and try again.";
    els.bibleChapterContent.innerHTML = '<p class="empty">Chapter unavailable right now.</p>';
    els.bibleChapterInsight.textContent = "Insight unavailable until chapter text is loaded.";
  }
}

function getSelectedChapterReference() {
  return `${els.bibleBook.value} ${els.bibleChapter.value}`;
}

function getVerseInsightText(verse) {
  if (verseInsightMap[verse.reference]) {
    return verseInsightMap[verse.reference];
  }

  const topic = String(verse.topic || "faith").toLowerCase();
  return `This verse calls you to practice ${topic} in a concrete action today.`;
}

function buildChapterInsight(bookName, chapter, versesList) {
  const firstVerseText = String(versesList?.[0]?.text || "").replace(/\\s+/g, " ").trim();
  const firstLine = firstVerseText ? ` Key line: ${firstVerseText.slice(0, 130)}${firstVerseText.length > 130 ? "..." : ""}` : "";
  const lens = getBookLens(bookName);
  return `Insight (${bookName} ${chapter}): ${lens}${firstLine} Reflect: What is one obedient step you can take today?`;
}

function getBookLens(bookName) {
  const wisdomBooks = new Set(["Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon"]);
  const gospels = new Set(["Matthew", "Mark", "Luke", "John"]);
  const history = new Set(["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Acts"]);
  const prophets = new Set(["Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Revelation"]);

  if (gospels.has(bookName)) {
    return "Look for Jesus' character, words, and how discipleship should shape your daily life.";
  }

  if (wisdomBooks.has(bookName)) {
    return "Notice the wisdom pattern and how it guides your choices, speech, and posture before God.";
  }

  if (history.has(bookName)) {
    return "Track God's faithfulness in real events and identify what trust and obedience look like now.";
  }

  if (prophets.has(bookName)) {
    return "Pay attention to God's call to repentance, hope, and covenant faithfulness.";
  }

  return "Look for gospel truth, practical obedience, and one action to apply today.";
}

function getBibleBook(name) {
  return bibleBooks.find((book) => book.name === name) || bibleBooks[0];
}

function clampChapter(book, chapter) {
  const value = Number.isFinite(chapter) ? chapter : 1;
  return Math.min(Math.max(value, 1), book.chapters);
}

function sanitizeTranslation(value) {
  return SUPPORTED_TRANSLATIONS.has(value) ? value : DEFAULT_BIBLE_READER.translation;
}

function toggleBookmark(reference) {
  const index = state.bookmarks.indexOf(reference);

  if (index >= 0) {
    state.bookmarks.splice(index, 1);
    saveState();
    return false;
  }

  state.bookmarks.push(reference);
  recordStudyDay();
  saveState();
  return true;
}

function recordStudyDay() {
  const today = getTodayKey();
  if (!state.studyDays.includes(today)) {
    state.studyDays.push(today);
  }
}

function calculateStreak() {
  const days = new Set(state.studyDays);
  const cursor = new Date();
  let streak = 0;

  while (days.has(formatDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function getTodayKey() {
  return formatDateKey(new Date());
}

function isTodayStudied() {
  return state.studyDays.includes(getTodayKey());
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getDailyReflectionPrompt() {
  const dayIndex = getDayOfYear(new Date()) % reflectionPrompts.length;
  return reflectionPrompts[dayIndex];
}

function normalizeBibleReader(raw) {
  const selectedBook = getBibleBook(raw?.book || DEFAULT_BIBLE_READER.book);
  const chapter = clampChapter(selectedBook, Number(raw?.chapter || DEFAULT_BIBLE_READER.chapter));
  const translation = sanitizeTranslation(raw?.translation || DEFAULT_BIBLE_READER.translation);

  return {
    book: selectedBook.name,
    chapter,
    translation
  };
}

function createDefaultState() {
  return {
    completedReadings: {},
    notes: [],
    reflections: [],
    prayers: [],
    bookmarks: [],
    studyDays: [],
    bibleReader: { ...DEFAULT_BIBLE_READER }
  };
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeRole(role) {
  return role === "admin" ? "admin" : "member";
}

function createGuestUser() {
  return {
    id: GUEST_USER_ID,
    name: "Guest",
    email: "guest@local",
    role: "guest",
    isGuest: true
  };
}

function countAdmins(users) {
  return users.filter((user) => normalizeRole(user.role) === "admin").length;
}

function ensureAdminPresence() {
  const users = loadUsers();
  if (!users.length || countAdmins(users) > 0) {
    return;
  }

  users[0].role = "admin";
  saveUsers(users);
}

function ensureDefaultAnnouncements() {
  const announcements = loadAnnouncements();
  if (announcements.length) {
    return;
  }

  saveAnnouncements([
    {
      id: crypto.randomUUID(),
      title: "Welcome to Pathlight",
      body: "Start with one chapter today, write one reflection, and add one prayer request.",
      createdAt: new Date().toISOString(),
      author: "Pathlight Team"
    }
  ]);
}

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((user) => user && user.id && user.email && user.password && user.name)
      .map((user) => ({
        ...user,
        email: normalizeEmail(user.email),
        role: normalizeRole(user.role)
      }));
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function loadAnnouncements() {
  try {
    const raw = localStorage.getItem(ANNOUNCEMENTS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item) => item && item.id && item.title && item.body && item.createdAt)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    return [];
  }
}

function saveAnnouncements(announcements) {
  localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(announcements));
}

function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  return loadUsers().find((user) => normalizeEmail(user.email) === normalizedEmail) || null;
}

function setSession(userId) {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ userId }));
}

function setGuestSession() {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ guest: true }));
}

function clearSession() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

function getSessionUser() {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (parsed?.guest) {
      return createGuestUser();
    }

    if (!parsed?.userId) {
      return null;
    }

    return loadUsers().find((user) => user.id === parsed.userId) || null;
  } catch (error) {
    return null;
  }
}

function loadStateForUser(userId) {
  try {
    const raw = localStorage.getItem(`${APP_STATE_PREFIX}${userId}`);
    if (!raw) {
      return createDefaultState();
    }

    const parsed = JSON.parse(raw);
    return {
      completedReadings: parsed.completedReadings || {},
      notes: Array.isArray(parsed.notes) ? parsed.notes : [],
      reflections: Array.isArray(parsed.reflections) ? parsed.reflections : [],
      prayers: Array.isArray(parsed.prayers) ? parsed.prayers : [],
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
      studyDays: Array.isArray(parsed.studyDays) ? parsed.studyDays : [],
      bibleReader: normalizeBibleReader(parsed.bibleReader)
    };
  } catch (error) {
    return createDefaultState();
  }
}

function saveStateForUser(userId, userState) {
  localStorage.setItem(`${APP_STATE_PREFIX}${userId}`, JSON.stringify(userState));
}

function saveState() {
  if (!currentUser) {
    return;
  }

  localStorage.setItem(`${APP_STATE_PREFIX}${currentUser.id}`, JSON.stringify(state));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
