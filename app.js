let jobs = []

window.addEventListener('load', () => {
    let jobsExists = localStorage.getItem('jobs')

    if(jobsExists) {
        jobs = JSON.parse(localStorage.getItem('jobs'))
    }

    startProgram()
})

function startProgram() {
    menu()
}

function menu() {
    let action = ""

    do {
        action = prompt("Selecione a opção desejada:" +
            "\n1 - Listar vagas" + 
            "\n2 - Criar uma nova vaga" +
            "\n3 - Visualizar uma vaga" +
            "\n4 - Inscrever candidato" +
            "\n5 - Exluir vaga" +
            "\n\nDigite: 'Sair' para encerrar o programa."
        )

        switch (action) {
            case '1':
                listAllJobs()
                break;
            case '2':
                createNewJob()
                break;
            case '3':
                viewJob()
                break;
            case '4':
                registerCandidate()
                break;
            case '5':
                deleteJob()
                break;
            case 'Sair':
                let exit = confirm('Deseja encerrar o programa ?')

                if(!exit) {
                    menu()
                }

                saveAllData()

                break;
            default:
                alert('Opção invalida.')
                break;
        }
    } while(action !== 'Sair')
}

function listAllJobs() {
    if(jobs.length === 0) {
        alert("Não existem vagas cadastradas no momento.")
        return
    }

    let allJobs = jobs.reduce(function (result, currentJob, index) {
        result += `${index + 1}. `
        result += currentJob.jobName
        result += ` (${currentJob.candidates.length} candidatos)\n`

        return result
    }, "")

    alert(allJobs)
}

function createNewJob() {
    let jobName = prompt('Digite o nome da vaga:')
    let descriptionJob = prompt('Digite uma descrição para a vaga:')
    let deadLineJob = prompt('Digite a data limite para a vaga (Formato: dd/mm/aaaa):')

    let createJob = confirm(
        "Deseja criar a vaga com esses dados?\n" +
        `\nNome: ${jobName}` + 
        `\nDescrição: ${descriptionJob}` + 
        `\nData limite: ${deadLineJob}`
    )

    if(createJob) {
        let job = {jobName, descriptionJob, deadLineJob, candidates: []}
        jobs.push(job)
    }

    saveAllData()
}


function viewJob() {
    let jobIndex = prompt('Digite o índice da vaga que deseja visualizar:')
    let job = jobs[jobIndex]

    if(!job) {
        return
    }

    let candidates = job.candidates.reduce(function(result, currentValue) {
        return result += `\n| ${currentValue}`
    }, "")

    job = `${jobIndex}. ${job.jobName} \n` + 
    `Descrição: ${job.descriptionJob} \n` +
    `Data limite: ${job.deadLineJob} \n` +
    `Candidatos:\n ${candidates}`

    alert(job)
}

function registerCandidate() {
    let candidateName = prompt('Digite o nome do(a) canditado(a): ')
    let jobIndex = prompt(`Digite o índice da vaga para qual deseja registrar ${candidateName}:`)

    let job = jobs[jobIndex]

    if(!job) {
        return
    }

    let register = confirm(`Deseja cadastrar ${candidateName} na vaga: \n\nVaga:${job.jobName} \n` + 
    `Descrição: ${job.descriptionJob} \n` +
    `Data limite: ${job.deadLineJob} \n`)

    if(!register) {
        return
    }

    job.candidates.push(candidateName)
    saveAllData()
}

function deleteJob() {
    let jobIndex = prompt('Digite o índice da vaga que deseja excluir:')
    let job = jobs[jobIndex]

    if(!job) {
        return
    }

    let candidates = job.candidates.reduce(function(result, currentValue) {
        return result += `\n| ${currentValue}`
    }, "")

    let deleteJob = confirm( `Deseja excluir mesmo esta vaga?\n\n` +
    `Vaga: ${job.jobName} \n` + 
    `Descrição: ${job.descriptionJob} \n` +
    `Data limite: ${job.deadLineJob} \n` +
    `Candidatos:\n ${candidates}`)

    if(!deleteJob) {
        return 
    }

    jobs.splice(jobIndex, 1)
    saveAllData()
}

function saveAllData() {
    let jsonJobs = JSON.stringify(jobs)
    localStorage.setItem('jobs', jsonJobs)
}