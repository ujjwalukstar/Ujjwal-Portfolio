// Initialize AOS (Animate on Scroll)
AOS.init({
  duration: 1000,
  once: true,
  mirror: false,
})

// Preloader
document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.createElement("div")
  preloader.className = "preloader"
  preloader.innerHTML = '<div class="loader"></div>'
  document.body.appendChild(preloader)

  // Progress bar
  const progressBar = document.createElement("div")
  progressBar.className = "progress-bar"
  document.body.appendChild(progressBar)

  // Scroll to top button
  const scrollTop = document.createElement("div")
  scrollTop.className = "scroll-top"
  scrollTop.innerHTML = '<i class="bx bx-up-arrow-alt"></i>'
  document.body.appendChild(scrollTop)

  // Custom cursor
  const cursor = document.createElement("div")
  cursor.className = "custom-cursor"
  document.body.appendChild(cursor)

  const cursorDot = document.createElement("div")
  cursorDot.className = "cursor-dot"
  document.body.appendChild(cursorDot)

  // Hide preloader after page loads
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("fade-out")
      setTimeout(() => {
        preloader.remove()
      }, 500)
    }, 1000)
  })

  // Custom cursor
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    cursorDot.style.left = e.clientX + "px"
    cursorDot.style.top = e.clientY + "px"
  })

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)"
    cursorDot.style.transform = "translate(-50%, -50%) scale(0.5)"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)"
    cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
  })

  // Progress bar
  window.addEventListener("scroll", () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight
    const progress = (window.pageYOffset / totalHeight) * 100
    progressBar.style.width = progress + "%"

    // Show/hide scroll to top button
    if (window.pageYOffset > 500) {
      scrollTop.classList.add("active")
    } else {
      scrollTop.classList.remove("active")
    }
  })

  // Scroll to top
  scrollTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Mobile Menu Toggle
  const menuIcon = document.querySelector("#menu-icon")
  const navlist = document.querySelector(".navlist")

  if (menuIcon) {
    menuIcon.addEventListener("click", () => {
      navlist.classList.toggle("open")
      menuIcon.classList.toggle("bx-x")
    })
  }

  // Close menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".navlist a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navlist.classList.remove("open")
      menuIcon.classList.remove("bx-x")
    })
  })

  // Active link based on scroll position
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section")
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 100
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(".navlist a[href*=" + sectionId + "]").classList.add("active")
      } else {
        document.querySelector(".navlist a[href*=" + sectionId + "]").classList.remove("active")
      }
    })

    // Header scroll effect
    const header = document.querySelector("header")
    header.classList.toggle("sticky", window.scrollY > 100)
  })

  // Form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form values
      const name = this.querySelector('input[type="text"]').value
      const email = this.querySelector('input[type="email"]').value
      const phone = this.querySelector('input[type="tel"]').value
      const message = this.querySelector("textarea").value

      // Simple validation
      if (!name || !email || !phone || !message) {
        alert("Please fill in all fields")
        return
      }

      // Here you would typically send the form data to a server
      // For now, we'll just show a success message
      alert("Thank you for your message! I will get back to you soon.")
      this.reset()
    })
  }

  // Project upload functionality
  // This would be connected to a backend in a real implementation
  // For now, we'll create a simple preview function

  // Add project upload button to the projects section
  const projectsSection = document.querySelector(".projects-container")
  if (projectsSection) {
    const uploadButton = document.createElement("div")
    uploadButton.className = "project-upload"
    uploadButton.innerHTML = `
      <div class="upload-card">
        <input type="file" id="projectImage" accept="image/*" style="display: none;">
        <div class="upload-content">
          <i class='bx bx-plus-circle'></i>
          <h3>Add New Project</h3>
          <p>Click to upload your project</p>
        </div>
      </div>
    `

    projectsSection.appendChild(uploadButton)

    // Style the upload card
    const style = document.createElement("style")
    style.textContent = `
      .project-upload {
        grid-column: 1 / -1;
        margin-top: 30px;
      }
      .upload-card {
        background: var(--bg-color);
        border: 2px dashed var(--primary-color);
        border-radius: 10px;
        padding: 40px;
        text-align: center;
        cursor: pointer;
        transition: var(--transition);
      }
      .upload-card:hover {
        background: rgba(0, 166, 255, 0.05);
      }
      .upload-content i {
        font-size: 50px;
        color: var(--primary-color);
        margin-bottom: 15px;
      }
      .upload-content h3 {
        margin-bottom: 10px;
      }
      .project-form {
        background: var(--second-bg-color);
        padding: 30px;
        border-radius: 10px;
        margin-top: 20px;
      }
      .project-form h3 {
        margin-bottom: 20px;
        text-align: center;
      }
      .form-group {
        margin-bottom: 15px;
      }
      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
      }
      .form-group input, .form-group textarea, .form-group select {
        width: 100%;
        padding: 10px;
        background: var(--bg-color);
        border: none;
        border-radius: 5px;
        color: var(--text-color);
      }
      .form-group textarea {
        height: 100px;
        resize: none;
      }
      .tag-input {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 10px;
      }
      .tag {
        background: rgba(0, 166, 255, 0.1);
        color: var(--primary-color);
        padding: 5px 10px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .tag i {
        cursor: pointer;
      }
      .preview-img {
        max-width: 100%;
        max-height: 200px;
        margin-top: 10px;
        border-radius: 5px;
      }
    `
    document.head.appendChild(style)

    // Handle click on upload card
    const uploadCard = document.querySelector(".upload-card")
    const fileInput = document.getElementById("projectImage")

    uploadCard.addEventListener("click", () => {
      fileInput.click()
    })

    fileInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0]

        // Remove upload card
        uploadButton.remove()

        // Create project form
        const projectForm = document.createElement("div")
        projectForm.className = "project-form"
        projectForm.innerHTML = `
          <h3>Add New Project</h3>
          <div class="form-group">
            <label for="projectTitle">Project Title</label>
            <input type="text" id="projectTitle" placeholder="Enter project title">
          </div>
          <div class="form-group">
            <label for="projectDescription">Project Description</label>
            <textarea id="projectDescription" placeholder="Enter project description"></textarea>
          </div>
          <div class="form-group">
            <label>Project Image</label>
            <div id="imagePreview"></div>
          </div>
          <div class="form-group">
            <label>Technologies Used</label>
            <input type="text" id="tagInput" placeholder="Add a tag and press Enter">
            <div class="tag-input" id="tagContainer"></div>
          </div>
          <div class="form-group">
            <label for="projectDemo">Demo URL (optional)</label>
            <input type="url" id="projectDemo" placeholder="https://example.com">
          </div>
          <div class="form-group">
            <label for="projectGithub">GitHub URL (optional)</label>
            <input type="url" id="projectGithub" placeholder="https://github.com/username/repo">
          </div>
          <button type="button" class="btn" id="saveProject">Save Project</button>
          <button type="button" class="btn btn-secondary" id="cancelProject">Cancel</button>
        `

        projectsSection.appendChild(projectForm)

        // Show image preview
        const imagePreview = document.getElementById("imagePreview")
        const img = document.createElement("img")
        img.className = "preview-img"
        img.src = URL.createObjectURL(file)
        imagePreview.appendChild(img)

        // Handle tags
        const tagInput = document.getElementById("tagInput")
        const tagContainer = document.getElementById("tagContainer")
        const tags = []

        tagInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            const tag = tagInput.value.trim()
            if (tag && !tags.includes(tag)) {
              tags.push(tag)
              renderTags()
              tagInput.value = ""
            }
          }
        })

        function renderTags() {
          tagContainer.innerHTML = ""
          tags.forEach((tag, index) => {
            const tagElement = document.createElement("div")
            tagElement.className = "tag"
            tagElement.innerHTML = `
              ${tag} <i class='bx bx-x' data-index="${index}"></i>
            `
            tagContainer.appendChild(tagElement)
          })

          // Add event listeners to remove tags
          document.querySelectorAll(".tag i").forEach((icon) => {
            icon.addEventListener("click", (e) => {
              const index = e.target.dataset.index
              tags.splice(index, 1)
              renderTags()
            })
          })
        }

        // Handle save project
        document.getElementById("saveProject").addEventListener("click", () => {
          const title = document.getElementById("projectTitle").value
          const description = document.getElementById("projectDescription").value
          const demoUrl = document.getElementById("projectDemo").value
          const githubUrl = document.getElementById("projectGithub").value

          if (!title || !description) {
            alert("Please fill in the required fields")
            return
          }

          // Create new project card
          const projectCard = document.createElement("div")
          projectCard.className = "project-card"
          projectCard.innerHTML = `
            <div class="project-img">
              <img src="${img.src}" alt="${title}">
            </div>
            <div class="project-content">
              <h3>${title}</h3>
              <p>${description}</p>
              <div class="project-tags">
                ${tags.map((tag) => `<span>${tag}</span>`).join("")}
              </div>
              <div class="project-links">
                ${demoUrl ? `<a href="${demoUrl}" class="btn-small" target="_blank"><i class='bx bx-link-external'></i> Live Demo</a>` : ""}
                ${githubUrl ? `<a href="${githubUrl}" class="btn-small" target="_blank"><i class='bx bxl-github'></i> GitHub</a>` : ""}
              </div>
            </div>
          `

          // Add the new project card to the beginning of the projects container
          projectsSection.insertBefore(projectCard, projectsSection.firstChild)

          // Remove the form
          projectForm.remove()

          // Add the upload button back
          projectsSection.appendChild(uploadButton)

          // Reset file input
          fileInput.value = ""

          // Show success message
          alert("Project added successfully!")
        })

        // Handle cancel
        document.getElementById("cancelProject").addEventListener("click", () => {
          projectForm.remove()
          projectsSection.appendChild(uploadButton)
          fileInput.value = ""
        })
      }
    })
  }

  // Add animation classes to elements when they come into view
  const animateElements = document.querySelectorAll(".project-card, .cert-card, .contact-item")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  animateElements.forEach((element) => {
    observer.observe(element)
  })

  // Typing effect for home section
  const typeElement = document.querySelector(".home-text h1")
  if (typeElement) {
    const text = typeElement.textContent
    typeElement.textContent = ""

    let i = 0
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        typeElement.textContent += text.charAt(i)
        i++
      } else {
        clearInterval(typeInterval)
      }
    }, 100)
  }
})
