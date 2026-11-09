-- Optional Oracle Database 19c+ schema. This is not applied automatically.
-- Run as a dedicated application schema owner, never SYS or SYSTEM.
CREATE TABLE cs2_lineup_marks (
    telegram_id NUMBER(16, 0) NOT NULL,
    grenade_id VARCHAR2(100 CHAR) NOT NULL,
    kind VARCHAR2(8 CHAR) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
    CONSTRAINT cs2_marks_pk PRIMARY KEY (telegram_id, grenade_id, kind),
    CONSTRAINT cs2_marks_user_ck CHECK (telegram_id > 0 AND telegram_id <= 9007199254740991),
    CONSTRAINT cs2_marks_kind_ck CHECK (kind IN ('favorite', 'mastered'))
);

COMMENT ON TABLE cs2_lineup_marks IS 'Telegram CS2 lineup favorites and mastered marks';

-- Idempotent mark-on with bind parameters (execute separately from schema setup):
-- MERGE INTO cs2_lineup_marks target
-- USING (SELECT :telegram_id telegram_id, :grenade_id grenade_id, :kind kind FROM dual) source
-- ON (target.telegram_id = source.telegram_id AND target.grenade_id = source.grenade_id AND target.kind = source.kind)
-- WHEN NOT MATCHED THEN INSERT (telegram_id, grenade_id, kind)
-- VALUES (source.telegram_id, source.grenade_id, source.kind);

-- Mark-off: DELETE FROM cs2_lineup_marks
-- WHERE telegram_id = :telegram_id AND grenade_id = :grenade_id AND kind = :kind;
-- Delete personal data: DELETE FROM cs2_lineup_marks WHERE telegram_id = :telegram_id;
