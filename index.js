document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('addRecipeModal');
    const addRecipeBtn = document.querySelector('.add-recipe-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    
    // Open modal
    addRecipeBtn.addEventListener('click', function() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal functions
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Ingredients functionality
    const addIngredientBtn = document.getElementById('addIngredient');
    const ingredientsList = document.getElementById('ingredientsList');
    
    addIngredientBtn.addEventListener('click', function() {
        const ingredientRow = document.createElement('div');
        ingredientRow.className = 'ingredient-row';
        ingredientRow.innerHTML = `
            <input type="text" placeholder="Ingredient name">
            <input type="text" placeholder="Amount">
            <button type="button" class="remove-ingredient">-</button>
        `;
        ingredientsList.appendChild(ingredientRow);
        
        // Add event listener to the new remove button
        const removeBtn = ingredientRow.querySelector('.remove-ingredient');
        removeBtn.addEventListener('click', function() {
            ingredientRow.remove();
        });
    });
    
    // Add event listeners to existing remove buttons
    document.querySelectorAll('.remove-ingredient').forEach(button => {
        button.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
    
    // Instructions functionality
    const addInstructionBtn = document.getElementById('addInstruction');
    const instructionsList = document.getElementById('instructionsList');
    
    addInstructionBtn.addEventListener('click', function() {
        const instructionRow = document.createElement('div');
        instructionRow.className = 'instruction-row';
        
        // Get the current number of instructions
        const stepNumber = instructionsList.children.length + 1;
        
        instructionRow.innerHTML = `
            <span class="step-number">${stepNumber}</span>
            <textarea placeholder="Describe this step"></textarea>
            <button type="button" class="remove-instruction">-</button>
        `;
        instructionsList.appendChild(instructionRow);
        
        // Add event listener to the new remove button
        const removeBtn = instructionRow.querySelector('.remove-instruction');
        removeBtn.addEventListener('click', function() {
            instructionRow.remove();
            // Update step numbers
            updateStepNumbers();
        });
    });
    
    // Add event listeners to existing remove buttons
    document.querySelectorAll('.remove-instruction').forEach(button => {
        button.addEventListener('click', function() {
            this.parentElement.remove();
            // Update step numbers
            updateStepNumbers();
        });
    });
    
    // Function to update step numbers
    function updateStepNumbers() {
        const steps = instructionsList.querySelectorAll('.step-number');
        steps.forEach((step, index) => {
            step.textContent = index + 1;
        });
    }
    
    // Image preview functionality
    const recipeImage = document.getElementById('recipeImage');
    const imagePreview = document.getElementById('imagePreview');
    
    recipeImage.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.style.backgroundImage = `url(${e.target.result})`;
                imagePreview.textContent = '';
            }
            reader.readAsDataURL(file);
        }
    });
    
    // Privacy toggle functionality
    const privacyToggle = document.getElementById('privacyToggle');
    const privacyStatus = document.getElementById('privacyStatus');
    
    privacyToggle.addEventListener('change', function() {
        if (this.checked) {
            privacyStatus.textContent = 'Public';
            privacyStatus.style.color = 'var(--success-color)';
        } else {
            privacyStatus.textContent = 'Private';
            privacyStatus.style.color = 'var(--text-light)';
        }
    });
    
    // Form submission
    const recipeForm = document.getElementById('recipeForm');
    
    recipeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would normally collect all the form data and send it to the backend
        // For this demo, we'll just show an alert
        alert('Recipe saved successfully!');
        closeModal();
    });
    
    // Save recipe functionality
    const saveButtons = document.querySelectorAll('.save-recipe');
    
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = 'var(--primary-color)';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = 'var(--text-light)';
            }
        });
    });
    
    // Add cookbook functionality
    const addCookbookCard = document.querySelector('.add-cookbook');
    
    addCookbookCard.addEventListener('click', function() {
        // Here you would normally show a modal to create a new cookbook
        // For this demo, we'll just show an alert
        alert('Create new cookbook functionality coming soon!');
    });
    
    // New cookbook button functionality
    const newCookbookBtn = document.querySelector('.new-cookbook-btn');
    
    newCookbookBtn.addEventListener('click', function() {
        // Here you would normally show a modal to create a new cookbook
        // For this demo, we'll just show an alert
        alert('Create new cookbook functionality coming soon!');
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', function() {
        if (searchInput.value.trim() !== '') {
            // Here you would normally perform a search and display results
            // For this demo, we'll just show an alert
            alert(`Searching for: ${searchInput.value}`);
        }
    });
    
    // Allow search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            // Here you would normally perform a search and display results
            // For this demo, we'll just show an alert
            alert(`Searching for: ${this.value}`);
        }
    });
});
