CREATE TABLE public.face_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  original_image_url text NOT NULL,
  perceived_age int,
  headline text,
  summary text,
  result jsonb NOT NULL,
  user_agent text,
  ip text
);
GRANT ALL ON public.face_analyses TO service_role;
ALTER TABLE public.face_analyses ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.face_simulations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  analysis_id uuid REFERENCES public.face_analyses(id) ON DELETE SET NULL,
  before_image_url text NOT NULL,
  after_image_url text NOT NULL,
  treatment_keys text[] NOT NULL,
  treatment_names text[] NOT NULL
);
GRANT ALL ON public.face_simulations TO service_role;
ALTER TABLE public.face_simulations ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_face_analyses_created_at ON public.face_analyses (created_at DESC);
CREATE INDEX idx_face_simulations_created_at ON public.face_simulations (created_at DESC);
CREATE INDEX idx_face_simulations_analysis ON public.face_simulations (analysis_id);