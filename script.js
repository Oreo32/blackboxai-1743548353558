document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const messagesContainer = document.getElementById('messages');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Dark mode toggle functionality
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', isDark);
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Simulated AI responses
    const aiResponses = [
        "Meow?",
        "Meow Meow Meow Meow",
        "Meow Meow meow",
        "Meooooooowwwwwww",
        "MEOWWW!!!!!?"
    ];

    // Add welcome message
    addMessage('ai', aiResponses[0]);

    // Handle sending messages
    function handleSend() {
        const message = input.value.trim();
        if (!message) return;

        addMessage('user', message);
        input.value = '';
        
        // Show loading indicator
        const loadingId = addMessage('ai', '<div class="flex space-x-2"><div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div><div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.2s"></div><div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.4s"></div></div>', true);
        
        // Simulate AI response after delay
        setTimeout(() => {
            const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            updateMessage(loadingId, 'ai', response);
        }, 1500);
    }

    // Add message to chat
    function addMessage(sender, content, isHTML = false) {
        const messageId = 'msg-' + Date.now();
        const messageElement = document.createElement('div');
        messageElement.id = messageId;
        messageElement.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
        
        const bubble = document.createElement('div');
        bubble.className = `max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`;
        
        if (isHTML) {
            bubble.innerHTML = content;
        } else {
            bubble.textContent = content;
        }
        
        messageElement.appendChild(bubble);
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        return messageId;
    }

    // Update existing message
    function updateMessage(id, sender, content) {
        const messageElement = document.getElementById(id);
        if (messageElement) {
            const bubble = messageElement.querySelector('div');
            bubble.className = `max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`;
            bubble.textContent = content;
        }
    }

    // Event listeners
    sendButton.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});