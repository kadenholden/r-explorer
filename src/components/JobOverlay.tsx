import { exitJob, jobById, stepJob } from '../data/jobs'
import { useAppStore } from '../store/useAppStore'

/** The guided-job stepper: one card, Prev/Next, the 3D scene follows. */
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
    <aside className="job-overlay" role="status" aria-label="Guided job">
      <div className="p2015-header">
        <span className="p2015-code">
          {jobStep + 1}/{job.steps.length}
        </span>
        <span className="p2015-title">{job.title}</span>
        <button type="button" className="panel-close" aria-label="Exit job" onClick={exitJob}>
          ✕
        </button>
      </div>
      <div className="p2015-body">
        <h3 className="job-step-title">{step.title}</h3>
        <p className="job-step-text">{step.text}</p>
        <div className="p2015-readouts job-controls">
          <button
            type="button"
            className="avs-btn"
            onClick={() => stepJob(-1)}
            disabled={jobStep === 0}
          >
            ‹ Back
          </button>
          {last ? (
            <button type="button" className="avs-btn avs-btn--fault" onClick={exitJob}>
              Finish job ✓
            </button>
          ) : (
            <button type="button" className="avs-btn is-large" onClick={() => stepJob(1)}>
              Next ›
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
