document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const addRecipesModal = document.getElementById('addRecipesModal');
    const editCookbookModal = document.getElementById('editCookbookModal');
    const confirmationModal = document.getElementById('confirmationModal');
    
    const addRecipesBtn = document.querySelector('.add-recipes-btn');
    const editCookbookBtn = document.querySelector('.edit-cookbook-btn');
    const deleteCookbookBtn = document.querySelector('.delete-cookbook-btn');
    
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const cancelBtns = document.querySelectorAll('.cancel-btn');
    
    // Open modals
    addRecipesBtn.addEventListener('click', function() {
        addRecipesModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    editCookbookBtn.addEventListener('click', function() {
        editCookbookModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    deleteCookbookBtn.addEventListener('click', function() {
        confirmationModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modals
    function closeAllModals() {
        addRecipesModal.classList.remove('show');
        editCookbookModal.classList.remove('show');
        confirmationModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    cancelBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === addRecipesModal || e.target === editCookbookModal || e.target === confirmationModal) {
            closeAllModals();
        }
    });
    
    // Filter options in add recipes modal
    const filters = document.querySelectorAll('.filter');
    
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
        });
    });
    
    // Add recipe to cookbook
    const addToCookbookBtns = document.querySelectorAll('.add-to-cookbook-btn');
    let selectedCount = 0;
    
    addToCookbookBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const recipeOption = this.closest('.recipe-option');
            
            if (recipeOption.classList.contains('selected')) {
                recipeOption.classList.remove('selected');
                this.textContent = 'Add';
                selectedCount--;
            } else {
                recipeOption.classList.add('selected');
                this.textContent = 'Remove';
                selectedCount++;
            }
            
            // Update the button text with selected count
            document.querySelector('.save-btn').textContent = `Add Selected (${selectedCount})`;
        });
    });
    
    // Privacy toggle in cookbook header
    const privacyToggleBtn = document.querySelector('.privacy-toggle');
    const privacyBadge = document.querySelector('.privacy-badge');
    
    privacyToggleBtn.addEventListener('click', function() {
        if (privacyBadge.classList.contains('private')) {
            privacyBadge.classList.remove('private');
            privacyBadge.classList.add('public');
            privacyBadge.innerHTML = '<i class="fas fa-globe"></i> Public';
            this.innerHTML = '<i class="fas fa-lock"></i> Make Private';
        } else {
            privacyBadge.classList.remove('public');
            privacyBadge.classList.add('private');
            privacyBadge.innerHTML = '<i class="fas fa-lock"></i> Private';
            this.innerHTML = '<i class="fas fa-globe"></i> Make Public';
        }
    });
    
    // Remove recipe from cookbook
    const removeRecipeBtns = document.querySelectorAll('.remove-recipe');
    
    removeRecipeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click
            const recipeCard = this.closest('.recipe-card');
            
            // Add a fade out animation
            recipeCard.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            recipeCard.style.opacity = '0';
            recipeCard.style.transform = 'scale(0.9)';
            
            // Remove the card after animation completes
            setTimeout(() => {
                recipeCard.remove();
                // Update recipe count
                const recipeCount = document.querySelectorAll('.recipe-card').length;
                document.querySelector('.recipe-count').textContent = `${recipeCount} Recipes`;
            }, 300);
        });
    });
    
    // Sort recipes
    const sortSelect = document.getElementById('sortRecipes');
    
    sortSelect.addEventListener('change', function() {
        const recipeGrid = document.querySelector('.recipe-grid');
        const recipeCards = Array.from(document.querySelectorAll('.recipe-card'));
        
        // Sort the recipe cards based on selected option
        recipeCards.sort((a, b) => {
            const titleA = a.querySelector('h3').textContent.toLowerCase();
            const titleB = b.querySelector('h3').textContent.toLowerCase();
            
            if (this.value === 'az') {
                return titleA.localeCompare(titleB);
            } else if (this.value === 'za') {
                return titleB.localeCompare(titleA);
            }
            
            // For newest/oldest, we would normally use dates
            // For demo purposes, we'll just reverse the current order
            return this.value === 'oldest' ? 1 : -1;
        });
        
        // Clear and re-add the sorted cards
        recipeGrid.innerHTML = '';
        recipeCards.forEach(card => {
            recipeGrid.appendChild(card);
        });
    });
    
    // Image preview for cookbook cover
    const cookbookCover = document.getElementById('cookbookCover');
    const coverPreview = document.getElementById('coverPreview');
    
    cookbookCover.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                coverPreview.style.backgroundImage = `url(${e.target.result})`;
                coverPreview.textContent = '';
            }
            reader.readAsDataURL(file);
        }
    });
    
    // Privacy toggle in edit cookbook modal
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
    
    // Cookbook edit form submission
    const editCookbookForm = document.getElementById('editCookbookForm');
    
    editCookbookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would normally update the cookbook data
        // For this demo, we'll just update the UI and close the modal
        
        const cookbookName = document.getElementById('cookbookName').value;
        const cookbookDesc = document.getElementById('cookbookDescription').value;
        
        // Update the UI
        document.querySelector('.cookbook-info h1').textContent = cookbookName;
        document.querySelector('.cookbook-desc').textContent = cookbookDesc;
        
        alert('Cookbook updated successfully!');
        closeAllModals();
    });
    
    // Delete cookbook
    const deleteBtn = document.querySelector('.delete-btn');
    
    deleteBtn.addEventListener('click', function() {
        // Here you would normally delete the cookbook via API
        // For this demo, we'll just show an alert and redirect
        
        alert('Cookbook deleted successfully!');
        // Redirect to cookbooks page
        window.location.href = 'cookbooks.html';
    });
});
