document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('burgerMenu').addEventListener('click', function() {
        this.classList.toggle('active');
        document.getElementById('mobileNav').classList.toggle('active');
    });
    


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
    
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight || 80; 
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + window.innerHeight/2;
        let currentSection = null;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Update active class
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            const linkHref = link.getAttribute('href').substring(1);
            link.classList.toggle('active', linkHref === currentSection);
        });
    });
    
    
    var modal = document.getElementById('donationModal');
    var btn = document.getElementsByClassName('payButton'); 
    var span = document.querySelector('.close'); 

    for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = function() {
            modal.style.display = 'block';
        };
    }

    span.onclick = function() {
    modal.style.display = 'none';
    }

    window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    }

    const merchantLogin = "arhistratigdonbass"; 
    const password1 = "yv8Of5K9zCQ4aJv3hKIk"; 
    const robokassaUrl = "https://auth.robokassa.ru/Merchant/Index.aspx";

    document.querySelector(".submit-btn").addEventListener("click", function(e) {
        e.preventDefault();
    
        let amount = document.querySelector(".amount-buttons button.selected")?.innerText.replace("р.", "").trim();
        if (document.getElementById("otherAmountContainer").style.display !== "none") {
            const customAmount = document.getElementById("otherAmount").value;
            if (customAmount && customAmount > 0) {
                amount = customAmount;
            }
        }
    
        if (!amount) {
            alert("Пожалуйста, выберите или введите сумму пожертвования.");
            return;
        }
    
        const email = document.querySelector('input[type="email"]').value;
    
        if (!email) {
            alert("Пожалуйста, введите email.");
            return;
        }
    
        const invoiceId = Math.floor(Date.now() / 1000);
        const description = "Пожертвование на проект"; 
    
        const crcString = `${merchantLogin}:${amount}:${invoiceId}:${password1}`;
        const signatureValue = md5(crcString);
    
        const form = document.createElement("form");
        form.method = "POST";
        form.action = robokassaUrl;
    
        const fields = {
            MerchantLogin: merchantLogin,
            OutSum: amount,
            InvId: invoiceId,
            Desc: description,
            SignatureValue: signatureValue,
            Email: email,
            Culture: "ru",
            Test: "1"
        };
    
        for (const key in fields) {
            if (fields.hasOwnProperty(key)) {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                input.value = fields[key];
                form.appendChild(input);
            }
        }

        console.log("Готовим POST запрос на Robokassa:");
        console.log({
            MerchantLogin: merchantLogin,
            OutSum: amount,
            InvId: invoiceId,
            Desc: description,
            SignatureValue: signatureValue,
            Email: email,
            Culture: "ru",
        });
    
        document.body.appendChild(form);
        form.submit();
    });

    const amountButtons = document.querySelectorAll('.amount-buttons button');

    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            amountButtons.forEach(btn => btn.classList.remove('selected'));

            this.classList.add('selected');

            if (this.id === 'otherSum') {
                document.getElementById('otherAmountContainer').style.display = 'block';
            } else {
                document.getElementById('otherAmountContainer').style.display = 'none';
            }
        });
    });
    
    document.querySelectorAll(".amount-buttons button").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".amount-buttons button").forEach(b => b.classList.remove("selected"));
            this.classList.add("selected");
    
            if (this.id === "otherSum") {
                document.getElementById("otherAmountContainer").style.display = "block";
            } else {
                document.getElementById("otherAmountContainer").style.display = "none";
            }
        });
    });

});
