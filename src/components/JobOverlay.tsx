import { exitJob, jobById, stepJob } from '../data/jobs'
import { useAppStore } from '../store/useAppStore'

/** The guided-job stepper: one card, Back/Next, the 3D scene follows. */
export function JobOverlay() {
  const activeJob = useAppStore((s) => s.activeJob)
  const jobStep = useAppStore((s) => s.jobStep)
  if (!activeJob) return null
  const job = jobById(activeJob)
  if (!job) return null
  const step = job.steps[jobStep]
  if (!step) return null
  const last = jobStep === job.steps.length - 1

  return (
    <aside className="context-card context-card--job" role="status" aria-label="Guided job">
      <div className="context-head">
        <span className="context-code">
          {jobStep + 1}/{job.steps.length}
        </span>
        <span className="context-title">{job.title}</span>
        <button type="button" className="panel-close" aria-label="Exit job" onClick={exitJob}>
          ✕
        </button>
      </div>
      <div className="context-body">
        <h3 className="step-title">{step.title}</h3>
        <p className="step-text">{step.text}</p>
        <div className="btn-row">
          <button type="button" className="btn" onClick={() => stepJob(-1)} disabled={jobStep === 0}>
            ‹ Back
          </button>
          {last ? (
            <button type="button" className="btn btn--primary" onClick={exitJob}>
              Finish ✓
            </button>
          ) : (
            <button type="button" className="btn btn--primary" onClick={() => stepJob(1)}>
              Next ›
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
