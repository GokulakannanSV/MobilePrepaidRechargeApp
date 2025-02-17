document.addEventListener("DOMContentLoaded", function () {
    const payNowButtons = document.querySelectorAll(".btn-payment");
    const modal = document.createElement("div");
    modal.innerHTML = `
        <div class="modal fade" id="loadingModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <p>Wait some time while we process your payment...</p>
                        <div class="progress">
                            <div id="progressBar" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    document.body.appendChild(modal);
    
    payNowButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const originalText = button.innerHTML;
            button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
            button.disabled = true;
            
            const bootstrapModal = new bootstrap.Modal(document.getElementById('loadingModal'));
            bootstrapModal.show();
            
            let progress = 0;
            const progressBar = document.getElementById("progressBar");
            const interval = setInterval(() => {
                progress += 10;
                progressBar.style.width = progress + "%";
                progressBar.setAttribute("aria-valuenow", progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.disabled = false;
                        bootstrapModal.hide();
                        window.location.href = "paymentSummary.html";
                    }, 500);
                }
            }, 300);
        });
    });
});


// Function to populate the modal with the card data
function showPlanDetails(button) {
    // Get the card body
    var cardBody = button.closest('.card-body');
    
    // Extract content using the class names you defined
    var title = cardBody.querySelector('.plan-title').textContent.trim();
    var price = cardBody.querySelector('.plan-price').textContent.trim();
    var validity = cardBody.querySelector('.plan-validity').textContent.split(':')[1].trim();
    var dataPerDay = parseInt(cardBody.querySelector('.plan-data').textContent.split(':')[1].split('GB')[0].trim());
    var ottBenefits = cardBody.querySelector('.plan-ott').textContent.split(':')[1].trim();

    // Hardcoded values
    var voice = 'Unlimited Calls';
    var sms = '100/day';

    // Calculate total data
    var totalData = dataPerDay * parseInt(validity.split(' ')[0]);

    // Update the modal fields dynamically
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalPrice').textContent = price;
    document.getElementById('modalOTTs').textContent = ottBenefits;
    document.getElementById('modalValidity').textContent = validity;
    document.getElementById('modalTotalData').textContent = totalData + "GB";
    document.getElementById('modalHighSpeedData').textContent = dataPerDay + "GB/day";
    document.getElementById('modalVoice').textContent = voice;
    document.getElementById('modalSMS').textContent = sms;
}

function validateMobileNumber() {
    let mobileInput = document.getElementById("mobileNumber").value.trim();
    let error_message = document.getElementById("error-mobilenumber").value;
    let mobileRegex = /^[6-9]\d{9}$/; // Ensures a 10-digit number starting with 6,7,8, or 9

    if (mobileRegex.test(mobileInput)) {
        error_message.textContent = "";
    } else {
        error_message.textContent = "Invalid Mobile Number ❌";
    }
}

